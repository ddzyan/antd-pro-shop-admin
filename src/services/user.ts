import request from '@/utils/request';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface CreateOrEditUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

export interface EditUser {
  name: string;
  email: string;
}

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/admin/user');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function getUserList(params: any): Promise<any> {
  return request('/admin/users', { params });
}

export async function setLock(uid: number) {
  return request.patch(`/admin/users/${uid}/lock`);
}

export async function createUser(data: CreateUser) {
  return request.post('/admin/users', {
    data,
  });
}

export async function getUser(uid: number) {
  return request(`/admin/users/${uid}`);
}

export async function editUser(uid: number, data: EditUser) {
  const { name, email } = data;
  return request.put(`/admin/users/${uid}`, {
    data: {
      name,
      email,
    },
  });
}
