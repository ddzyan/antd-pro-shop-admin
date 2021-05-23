export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/dashboard',
              },
              {
                name: 'dashboard',
                path: '/dashboard',
                icon: 'PieChartOutlined',
                component: '@/pages/DashBoard',
              },
              {
                name: 'userlist',
                path: '/userlist',
                icon: 'UserOutlined',
                component: '@/pages/User/list',
              },
              {
                name: 'goods',
                path: '/goods',
                icon: 'ShoppingOutlined',
                component: '@/pages/Goods',
              },
              {
                name: 'category',
                path: '/category',
                icon: 'ShoppingOutlined',
                component: '@/pages/Category',
              },
              {
                name: 'order',
                path: '/order',
                icon: 'UnorderedListOutlined',
                component: '@/pages/Order',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
