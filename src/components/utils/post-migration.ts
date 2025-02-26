import type { UserCredential } from 'firebase/auth';
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { COOKIE_NAMES, getCookie, removeCookie } from './cookies';

export const handleGuestPostMigration = async (
  currentUser: UserCredential['user'],
) => {
  const guestPostId = getCookie(COOKIE_NAMES.POST_ID);

  if (guestPostId) {
    try {
      // anonymous_posts에서 데이터 가져오기
      const anonymousRef = doc(db, 'anonymous_posts', guestPostId);
      const anonymousDoc = await getDoc(anonymousRef);

      if (anonymousDoc.exists()) {
        const postData = anonymousDoc.data();

        // posts 컬렉션으로 데이터 이동
        await setDoc(doc(db, 'posts', guestPostId), {
          ...postData,
          userId: currentUser.uid,
          email: currentUser.email,
        });

        // anonymous_posts에서 데이터 삭제
        await deleteDoc(anonymousRef);

        // 사용자의 postList에 추가
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const newPostList = [guestPostId, ...(userData.postList || [])];
          await setDoc(userRef, { postList: newPostList }, { merge: true });
        }

        // POST_ID 쿠키 삭제
        removeCookie(COOKIE_NAMES.POST_ID);
      }
    } catch (error) {
      console.error('포스트 이전 중 오류 발생:', error);
    }
  }
};
