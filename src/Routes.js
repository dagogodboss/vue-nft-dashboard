import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Main
import NftPage from '@/pages/NFT/Nft';

// Charts
import ChartsPage from '@/pages/Charts/Charts';

// Ui
import IconsPage from '@/pages/Icons/Icons';
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
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
          beforeEnter: isAuth
          
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
          beforeEnter: isAuth
          
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
          beforeEnter: isAuth
          
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
          beforeEnter: isAuth
          
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
          beforeEnter: isAuth
          
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
          beforeEnter: isAuth
          
        },
      ],
    },
  ],
});
