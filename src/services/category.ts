import request from '@/utils/request';

export async function getCategory(): Promise<any> {
  return request('/admin/category');
}
