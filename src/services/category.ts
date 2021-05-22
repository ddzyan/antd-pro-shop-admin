import request from '@/utils/request';

// 获取列表
export async function getCategory(params: any = {}): Promise<any> {
  return request('/admin/category', { params });
}

// 编辑
export async function editCategory(
  categoryId: number,
  data: { name: string; pid?: number },
): Promise<any> {
  return request(`/admin/category/${categoryId}`, {
    method: 'PUT',
    data,
  });
}

// 创建
export async function addCategory(data: {
  name: string;
  pid?: number;
  group?: string;
}): Promise<any> {
  return request('/admin/category', {
    method: 'post',
    data,
  });
}

export async function updateCategoryStatus(categoryId: number): Promise<any> {
  return request(`/admin/category/${categoryId}/status`, {
    method: 'patch',
  });
}
