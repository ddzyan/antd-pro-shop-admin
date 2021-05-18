import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(data: LoginParamsType) {
  return request.post('/auth/login', {
    data,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function logout() {
  return request.post('/auth/logout');
}
