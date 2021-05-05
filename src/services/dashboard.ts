import request from '@/utils/request';

export function getDashBoard() {
  return request('/admin/index');
}
