<template>
  <div class="sidebar-wrapper" style="height:100%">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
        style="height:100vh"
    >
      <header class="logo">
        <router-link to="/app/dashboard"><span class="primary-word">RTFKT</span> <span class="secondary-word"> </span></router-link>
      </header>
      <h5 class="navTitle first">
        APP
      </h5>
      <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="Dashboard"
            link="/app/dashboard"
            iconName="flaticon-home"
            index="dashboard"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Products"
            link="/app/products"
            iconName="glyphicon glyphicon-th-list"
            index="products"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Game Avatar"
            link="/app/avatars"
            iconName="flaticon-th-large"
            index="avatars"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="NFT's"
            link="/app/nfts"
            iconName="glyphicon glyphicon-euro"
            index="nfts"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Users"
            link="/app/users"
            iconName="flaticon-user"
            index="users"
            isHeader
        />
      </ul>
      <h5 class="navTitle">
        STATUS
      </h5>
      <ul class="sidebarLabels">
        <li v-if="setWalletConnected">
          <i class="fa fa-circle text-success" style="margin-right: 19px !important; display: inline;"/>
          <span class="labelName">Wallet Connected</span>
        </li>
        <li v-if="!setWalletConnected">
          <i class="fa fa-circle text-danger" style="margin-right: 19px !important; display: inline;"/>
          <span class="labelName">Wallet Disconnected</span>
        </li>

      </ul>
      <h5 class="navTitle">
        Blockchain Info
      </h5>
      <div class="sidebarAlerts" style="padding-left: 25px">
        <small>{{getChainName}}</small>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    }
  
  },
  mounted() {
          return  this.$store.dispatch("accounts/ethereumListener");
  }, 
  unmounted(){
    return this.$store.dispatch("accounts/removeEthereumListener");
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
    ...mapGetters("accounts", ["getChainName", "getWeb3Modal", "getActiveAccount"]),
  setWalletConnected(){
    if(localStorage.getItem('isConnected') == 'true'){
      return true
    }
    else{
      return false
    }
  },
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
