import request from '@/utils/request';

export interface CreateGoods {
  category_id: number;
  title: string;
  cover: string;
  description: string;
  details: string;
  price: number;
  stock: number;
}

export interface UpdateGoods {
  title: string;
  cover: string;
  description: string;
  details: string;
  price: number;
  stock: number;
}

// 获得商品列表
export async function getGoods(params: any): Promise<any> {
  return request('/admin/goods', { params });
}

// 设置上架
export async function setOn(goodId: number) {
  return request.patch(`/admin/goods/${goodId}/on`);
}

// 设置推荐
export async function setRecommend(goodId: number) {
  return request.patch(`/admin/goods/${goodId}/recommend`);
}

// 创建商品
export async function createGood(data: CreateGoods) {
  return request.post('/admin/goods', {
    data,
  });
}

// 获取指定商品
export async function getGood(goodId: number) {
  return request(`/admin/goods/${goodId}?include=category`);
}

// 修改商品
export async function updateGood(goodId: number, data: UpdateGoods) {
  return request.put(`/admin/goods/${goodId}`, {
    data,
  });
}
