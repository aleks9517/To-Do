export const loadUser = () => ({
  type: 'USER'
});

export const register = (user) => ({
  type: 'REGISTER',
  name: user.name,
  email: user.email,
  password: user.password
});

export const login = (user) => ({
  type: 'LOGIN',
  email: user.email,
  password: user.password
});

export const logout = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  };
};