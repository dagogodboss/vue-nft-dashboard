<template>
<div :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard']">
  <Sidebar />
  <div class="wrap">
    <Header >
      <template v-if="!checkIfOnNav">
        <b-form class="d-sm-down-none ml-5" inline>
        <b-form-group>
          <b-input-group class="input-group-no-border">
            <template v-slot:prepend>
              <b-input-group-text><i class='fi flaticon-search-2'/></b-input-group-text>
            </template>
            <b-form-input id="search-input" placeholder="Search Dashboard" />
          </b-input-group>
        </b-form-group>
      </b-form>
      </template>

      <template v-if="checkIfOnNav">  
<div class="flex-container">
  
       <b-form  @submit.prevent="handleNft"  class="d-sm-down-none ml-2 mr-2" inline>
      <b-form-input ref="smartContract" id="smartContract" v-model="text" placeholder="Enter nft address"></b-form-input>
    </b-form>
     <b-form-select ref="itemPerPage" id="itemPerPage" v-model="selected"  size="sm" :options="options" class="mr-2 mt-3"></b-form-select>
        <b-button @click="handleNft" class="header-button-nft mr-2" size="sm"><span class="header-button-span">GET NFT </span></b-button>
  <b-button class="header-button-csv mr-2" size="sm"><span class="header-button-span"> Export as CSV</span></b-button>
  
      </div>
      </template>
    </Header>
    <v-touch class="content" @swipe="handleSwipe" :swipe-options="{direction: 'horizontal'}">
      <breadcrumb-history></breadcrumb-history>
      <transition name="router-animation">
        <router-view />
      </transition>
      <footer class="contentFooter">
        RTFKT CRM  Vue Dashboard Free Template - Made by <a href="https://flatlogic.com" rel="nofollow noopener noreferrer" target="_blank">Flatlogic</a>
      </footer>
    </v-touch>
  </div>
</div>
</template>

<script>
import {mapState, mapActions, mapMutations } from 'vuex';


import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import BreadcrumbHistory from '@/components/BreadcrumbHistory/BreadcrumbHistory';

import './Layout.scss';

export default {
  name: 'Layout',
  components: { Sidebar, Header, BreadcrumbHistory },
  data(){
    return{
      selected : null,
     options : [
       {value:"null",  text:"Select Item per Page"  },
    {value:"10",  text:"10 Per Page"  },
    {value:"50",  text:"50 Per Page"  },
    {value:"100",  text:"100 Per Page"  },
    {value:"200",  text:"200 Per Page"  },
    {value:"500",  text:"500 Per Page"  }
]
    }
  }
  ,
 
  methods: {
    ...mapActions('layout',['switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar'],
    ),
    ...mapActions('accounts',['fetchNfts','fetchUserRefs']),
    ...mapMutations('accounts',['setNfts']),

   async handleNft(){
        let payload = {
      smartContractRef: this.$refs.smartContract.value,
      userItemsRef : this.$refs.itemPerPage.value
    };
try{
  this.fetchUserRefs(payload);
  await this.fetchNfts()
}
catch(error){
  this.setNfts([{
            name: 'Error',
            address: error.message,
            nft_id: 'No ID'
        }])   
    }
    },
    handleWindowResize() {
      const width = window.innerWidth;

      if (width <= 768 && this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      }
    },
  },
  computed: {
    ...mapState('layout',["sidebarClose", "sidebarStatic"]),
    ...mapState('accounts',['nfts']),
  
  
    checkIfOnNav(){
      if(this.$route.name == "NftPage "){
        return true
      }
      else{
        return false
      }
    }
  },
  created() {
    const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

    if (staticSidebar) {
      this.$store.state.layout.sidebarStatic = true;
    } else if (!this.sidebarClose) {
      setTimeout(() => {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }, 2500);
    }

    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
};
</script>

<style src="./Layout.scss" lang="scss" />
