import { USERS_COLLECTION } from "../firebase";
import { User } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const USER_COUNT_LIMIT = 3;
const ANONYMOUS_COUNT_LIMIT = 1;

const formatTimeLeft = (
  milliseconds: number,
): { hours: number; minutes: number } => {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

export const getCountAndTimeLeft = async (
  user: User | null,
): Promise<{ count: number; limit: number; timeLeft: any }> => {
  const now = Date.now();
  const cooldownPeriod = 24 * 60 * 60 * 1000;

  if (user) {
    // 로그인한 경우, firebase에 이미지 생성 횟수와 마지막 갱신 시간 저장

    const userDocRef = doc(USERS_COLLECTION, user.uid);
    const userDoc = await getDoc(userDocRef);
    const data = userDoc.data();
    const lastReset = data?.lastReset?.toDate();

    // lastReset이 null일 경우 처리
    const lastResetTime = lastReset ? lastReset.getTime() : 0;

    // 현재 시간과 lastReset 시간의 경과 시간 계산
    const timeElapsed = now - lastResetTime;

    const userTimeLeft = Math.max(0, cooldownPeriod - timeElapsed);
    const { hours, minutes } = formatTimeLeft(userTimeLeft);

    if (!lastReset || (lastReset && now - lastResetTime > cooldownPeriod)) {
      // 저장된 마지막 갱신 시간이 없는 경우이거나,
      // 마지막 갱신 시간이 하루가 지난 경우, 생성 횟수 초기화 및 새로운 갱신 시간 저장
      await updateDoc(userDocRef, {
        count: 0,
        lastReset: new Date(),
      });
      return {
        count: 0,
        limit: USER_COUNT_LIMIT,
        timeLeft: { hours: 24, minutes: 0 },
      };
    } else {
      // 마지막 갱신 시간이 하루가 지나지 않은 경우
      return {
        count: data?.count || 0,
        limit: USER_COUNT_LIMIT,
        timeLeft: { hours, minutes },
      };
    }
  } else {
    // 비로그인의 경우, localStorage에 이미지 생성 횟수와 마지막 갱신 시간 저장
    const localCount = localStorage.getItem("imageGenCount");
    const localLastReset = localStorage.getItem("imageGenLastReset");
    const localLastResetTime = localLastReset
      ? new Date(localLastReset).getTime()
      : 0;

    // 현재 시간과 localLastResetTime 시간의 경과 시간 계산
    const timeElapsed = now - localLastResetTime;
    const localTimeLeft = Math.max(0, cooldownPeriod - timeElapsed);
    const { hours, minutes } = formatTimeLeft(localTimeLeft);

    if (
      !localLastReset ||
      (localLastReset &&
        new Date().getTime() - new Date(localLastResetTime).getTime() >
          24 * 60 * 60 * 1000)
    ) {
      // 마지막 갱신 시간이 하루가 지난 경우
      localStorage.setItem("imageGenCount", "0");
      localStorage.setItem("imageGenLastReset", new Date().toISOString());
      return {
        count: 0,
        limit: ANONYMOUS_COUNT_LIMIT,
        timeLeft: { hours: 24, minutes: 0 },
      };
    } else {
      // 마지막 갱신 시간이 하루가 지나지 않은 경우
      return {
        count: localCount ? parseInt(localCount, 10) : 0,
        limit: ANONYMOUS_COUNT_LIMIT,
        timeLeft: { hours, minutes },
      };
    }
  }
};

export const incrementCount = async (
  user: User | null,
  currentCount: number,
  limit: number,
) => {
  if (user) {
    const userDocRef = doc(USERS_COLLECTION, user.uid);
    await updateDoc(userDocRef, { count: currentCount + 1 });
  } else {
    localStorage.setItem("imageGenCount", (currentCount + 1).toString());
  }
};
