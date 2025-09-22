// 新增认证模块
export function login(username, password) {
  // 实现登录逻辑
  return { token: 'mock-token', user: { id: 1, username } };
}

export function logout() {
  // 实现登出逻辑
  return true;
}