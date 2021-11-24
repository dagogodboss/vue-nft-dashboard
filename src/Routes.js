import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
// import TypographyPage from '@/pages/Typography/Typography';

// Tables
// import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
// import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// NFT
import NftPage from '@/pages/NFT/Nft';
// User
import UserPage from '@/pages/User/User';
// Products
import ProductPage from '@/pages/Products/Product';
// Avatar
import AvatarPage from '@/pages/Games/Avatar';

// Charts
// import ChartsPage from '@/pages/Charts/Charts';

// Ui
// import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';


Vue.use(Router);

const isAuth = (to, from, next)=> {
  if(window.ethereum.selectedAddress != ''){
    if(window.localStorage.getItem("authenticated") === 'true'){
      next()
    }
    else{
      next('/login')
    }
  }
};




export default new Router({
// history : createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
          beforeEnter: isAuth
        },
        {
          path: 'nfts',
          name: 'NftPage ',
          component: NftPage ,
          beforeEnter: isAuth,
      
        },
        {
          path: 'users',
          name: 'User',
          component: UserPage,
          beforeEnter: isAuth,
      
        },
        {
          path: 'products',
          name: 'Product',
          component: ProductPage,
          beforeEnter: isAuth,
      
        },
        {
          path: 'avatars',
          name: 'Avatar',
          component: AvatarPage,
          beforeEnter: isAuth,
      
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
          beforeEnter: isAuth
          
        }
      ],
    },
  ],
});
