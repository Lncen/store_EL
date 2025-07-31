import { requestClient } from '#/api/request';

export namespace UserApi {
  export interface User {
    [key: string]: any;
    id: string;
    username: string;
    nickname: string;
    email?: string;
    balance: string;
    is_active: boolean;
    dept?: number;
    dept_name?: string;
    gender: 'female' | 'male' | 'secret';
    date_joined: string;
    last_login?: string;
  }

  export interface UserResults {
    count: number;
    next: null | string;
    previous: null | string;
    results: User[];
  }

  export interface UserDetail extends User {
    bio?: string;
    device_info?: Record<string, any>;
    avatar_path?: string;
    auto_order: boolean;
    is_staff: boolean;
    is_superuser: boolean;
  }

  export interface UserCreateParams {
    username: string;
    password: string;
    email?: string;
    nickname?: string;
    dept_id?: number;
    gender?: 'female' | 'male' | 'secret';
    avatar_path?: string;
    auto_order?: boolean;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    balance?: string;
    bio?: string;
  }

  export interface UserUpdateParams {
    id?: string;
    email?: string;
    nickname?: string;
    dept_id?: null | number;
    gender?: 'female' | 'male' | 'secret';
    avatar_path?: string;
    auto_order?: boolean;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    bio?: string;
  }

  export interface UserQueryParams {
    page?: number;
    page_size?: number;
    username?: string;
    email?: string;
    nickname?: string;
    is_active?: boolean;
    dept?: number;
    gender?: 'female' | 'male' | 'secret';
    ordering?: string;
  }

  export interface UserBalanceUpdateParams {
    balance: string;
  }

  export interface UserPasswordChangeParams {
    new_password: string;
  }

  export interface UserBalanceAdjustParams {
    adjustment: string;
  }
}

/**
 * 获取用户列表数据
 */
async function getUserList(params?: UserApi.UserQueryParams) {
  return requestClient.get<UserApi.UserResults>('/users/', {
    params,
    withCredentials: false,
  });
}

/**
 * 获取用户详情
 * @param id 用户 ID
 */
async function getUserDetail(id: string) {
  return requestClient.get<UserApi.UserDetail>(`/users/${id}/`);
}

/**
 * 创建用户
 * @param data 用户数据
 */
async function createUser(data: UserApi.UserCreateParams) {
  return requestClient.post<UserApi.UserDetail>('/users/', data);
}

/**
 * 更新用户
 * @param id 用户 ID
 * @param data 用户数据
 */
async function updateUser(id: string, data: UserApi.UserUpdateParams) {
  return requestClient.put<UserApi.UserDetail>(`/users/${id}/`, data);
}

/**
 * 部分更新用户
 * @param id 用户 ID
 * @param data 用户数据
 */
async function partialUpdateUser(id: string, data: UserApi.UserUpdateParams) {
  return requestClient.put<UserApi.UserDetail>(`/users/${id}/`, data);
}

/**
 * 删除用户
 * @param id 用户 ID
 */
async function deleteUser(id: string) {
  return requestClient.delete(`/users/${id}/`);
}

/**
 * 更新用户余额
 * @param id 用户 ID
 * @param data 余额数据
 */
async function updateUserBalance(
  id: string,
  data: UserApi.UserBalanceUpdateParams,
) {
  return requestClient.put<UserApi.UserDetail>(
    `/users/${id}/update_balance/`,
    data,
  );
}

/**
 * 调整用户余额
 * @param id 用户 ID
 * @param data 余额调整数据
 */
async function adjustUserBalance(
  id: string,
  data: UserApi.UserBalanceAdjustParams,
) {
  return requestClient.post<UserApi.UserDetail>(
    `/users/${id}/adjust_balance/`,
    data,
  );
}

/**
 * 修改用户密码
 * @param id 用户 ID
 * @param data 密码数据
 */
async function changeUserPassword(
  id: string | undefined,
  data: UserApi.UserPasswordChangeParams,
) {
  return requestClient.post(`/users/${id}/change_password/`, data);
}

/**
 * 批量操作用户
 * @param data - 操作数据
 * @param data.operation - 操作类型
 * @param data.user_ids - 用户ID列表
 * @returns 操作结果
 */
async function bulkUserOperations(data: {
  operation: 'activate' | 'deactivate' | 'delete';
  user_ids: string[];
}) {
  return requestClient.put<{ message: string }>(
    '/users/bulk_operations/',
    data,
  );
}

export {
  adjustUserBalance,
  bulkUserOperations,
  changeUserPassword,
  createUser,
  deleteUser,
  getUserDetail,
  getUserList,
  partialUpdateUser,
  updateUser,
  updateUserBalance,
};
