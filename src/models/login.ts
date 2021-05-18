import type { Reducer, Effect } from 'umi';
import { history } from 'umi';
import { fakeAccountLogin, logout } from '@/services/login';
import { setAccessToken } from '@/utils/authority';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.status === undefined) {
        message.success('登录成功');
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        history.replace('/');
      }

      // Login successfully
      /* if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      } */
    },

    *logout(_, { call }) {
      const load = message.loading('退出中...', 0);
      const response = yield call(logout);

      if (response.status === undefined) {
        localStorage.removeItem('user_info');
        localStorage.removeItem('access_token');
        message.success('退出成功');
        history.replace('/user/login');
      }

      load();
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      setAccessToken(payload.access_token);
      return {
        ...state,
      };
    },
  },
};

export default Model;
