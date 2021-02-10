import { Login, SignUp } from './types';
export const urls = {
  signUp: '/sign-up',
  login: '/login',
  logout: '/logout'
}

export const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


export const signUp = ({ username, email, password, firstName, lastName }: SignUp) => {
  return fetch(urls.signUp,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ username, email, password, firstName, lastName })
    })
}

export const login = ({ username, password, }: Login) => {
  return fetch(urls.signUp,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ username, password })
    })
}