<template>
  <b-navbar class="header d-print-none app-header">
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class='fi flaticon-menu' />
        </a>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <i class='fi flaticon-menu' />
        </a>
      </b-nav-item>
          <b-nav-item class="d-md-down-none">
        <a href="#" class="px-2">
          <i class='fi flaticon-flip' />
        </a>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <a href="#" class="px-2">
          <i class='fi flaticon-close' @click="clearNfts" />
        </a>
      </b-nav-item>
         
      <slot></slot>
    </b-nav>
   
    <a class="navbarBrand d-md-none">
      <i class="fa fa-circle text-danger" />
      &nbsp;
      RTFKT
      &nbsp;
      <i class="fa fa-circle text-primary" />
    </a>
   
  <b-button @click="logout" class="header-button" size="sm">DISCONNECT</b-button>

  </b-navbar>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Notifications from '@/components/Notifications/Notifications';

export default {
  name: 'Header',
  components: { Notifications },
  computed: {
    ...mapState('layout', ['sidebarClose', 'sidebarStatic']),
    ...mapGetters('accounts',['getActiveAccount'])
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
    ...mapActions('accounts',['disconnectWeb3Modal','clearNfts']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      this.disconnectWeb3Modal()
    },
  }
};
</script>

<style src="./Header.scss" lang="scss"></style>
