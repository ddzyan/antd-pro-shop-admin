enum LocalStorageKey {
  userInfo = 'user_info',
}

export const getUser = (): any => {
  const userInfoString: string | null = localStorage.getItem(LocalStorageKey.userInfo);
  if (userInfoString === null) {
    return {};
  }
  const userInfo = JSON.parse(userInfoString as string);
  return userInfo;
};

export const setUser = (user: any): void => {
  localStorage.setItem(LocalStorageKey.userInfo, JSON.stringify(user));
};
