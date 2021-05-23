import request from '@/utils/request';

// 获取订单列表
export const getOrders = async (params: any): Promise<any> => {
  return request('/admin/orders', { params: { ...params, include: 'user' } });
};

// 获取订单详情
export const getOrderDetail = async (orderId: number): Promise<any> => {
  return request(`/admin/orders/${orderId}`, {
    params: {
      include: 'goods,orderDetails',
    },
  });
};

// 订单发货
export const postOrder = async (
  orderId: number,
  params: { express_type: string; express_no: string },
): Promise<any> => {
  return request(`/admin/orders/${orderId}/post`, {
    method: 'PATCH',
    params,
  });
};
