const GUEST_MODE = 'GUEST_MODE' as const

/**
 * 게스트 모드 상태를 세션 스토리지에 저장합니다.
 * 탭을 닫으면 자동으로 삭제됩니다.
 */
export const setGuestMode = (value: boolean): void => {
  sessionStorage.setItem(GUEST_MODE, String(value));
};

/**
 * 세션 스토리지에서 게스트 모드 상태를 가져옵니다.
 * @returns {boolean | null} 게스트 모드 상태 (true/false) 또는 값이 없는 경우 null
 */
export const getGuestMode = (): boolean | null => {
  const value = sessionStorage.getItem(GUEST_MODE);
  if (value === null) return null;
  return value === 'true';
};

/**
 * 세션 스토리지에서 게스트 모드 상태를 삭제합니다.
 */
export const removeGuestMode = (): void => {
  sessionStorage.removeItem(GUEST_MODE);
};
