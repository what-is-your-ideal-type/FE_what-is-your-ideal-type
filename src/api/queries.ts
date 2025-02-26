import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from 'firebase/auth';

export const fetchUserData = async (user: User) => {
  try {
    const uid = user.uid;
    const docRef = doc(db, 'users', uid);
    const usersSnapShot = await getDoc(docRef);
    const userData = usersSnapShot.data();
    if (!userData) {
      throw new Error('사용자 데이터를 찾을 수 없습니다.');
    }
    return userData;
  } catch (error) {
    console.error('사용자 데이터 가져오기 실패:', error);
    throw error;
  }
};

export const fetchPostsData = async (userData: any, pageParam: number) => {
  try {
    if (!userData || !userData.postList) {
      return { posts: [] };
    }

    const postList = userData.postList.slice(pageParam * 4, pageParam * 4 + 4);

    const fetchedPosts = await Promise.all(
      postList.map(async (num: string) => {
        const postRef = doc(db, 'posts', num);
        const postSnapShot = await getDoc(postRef);
        const data = postSnapShot.data();

        if (!data) return null;

        return {
          imageUrl: data.imageUrl,
          createdAt: data.createdAt.toDate(),
          fileName: data.fileName,
          hashTags: data.hashTags,
          resultUrl: `${window.location.origin}/result/${data.id}`,
          profile: data.profile,
          id: data.id,
        };
      }),
    );

    const validPosts = fetchedPosts.filter((post) => post !== null);

    return {
      posts: validPosts,
      nextPage: validPosts.length === 4 ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error('포스트 데이터 가져오기 실패:', error);
    throw error;
  }
};
