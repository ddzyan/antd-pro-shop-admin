import request from '@/utils/request';

export function ossConfig() {
  return request('/auth/oss/token');
}
