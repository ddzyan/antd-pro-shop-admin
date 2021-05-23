import request from '@/utils/request';

// 获取订单列表
export const getSlides = async (params: any): Promise<any> => {
  return request('/admin/slides', { params: { ...params, include: 'user' } });
};

// 禁用启用
export const updateSlidesStatus = async (slideId: number): Promise<any> => {
  return request.patch(`/admin/slides/${slideId}/status`);
};

// 添加
export const addSlides = async (data: any): Promise<any> => {
  return request.post('/admin/slides', { data });
};

// 修改
export const editSlides = async (slideId: number, data: any): Promise<any> => {
  return request.put(`/admin/slides/${slideId}`, { data });
};

// 修改
export const delSlides = async (slideId: number): Promise<any> => {
  return request.delete(`/admin/slides/${slideId}`);
};
