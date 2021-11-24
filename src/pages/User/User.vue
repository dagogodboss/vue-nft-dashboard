<template>
  <div class="dashboard-page">
    <h1 class="page-title">Users</h1>
    <b-row>
      <b-col>   
<div>
    <b-table striped hover :items="nfts"></b-table>
  </div>
      </b-col>
 
      </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import BigStat from '../Dashboard/components/BigStat/BigStat.vue';
import mock from '../Dashboard/mock';
import {mapState} from 'vuex';


export default {
  name: 'User',
  components: {
    Widget, BigStat, 
  },
  data() {
    return {
      mock,
    };
  },
  methods: {

  },
  computed: {
  ...mapState('accounts',['nfts']),
  },
  unmounted(){
 return this.$store.dispatch("accounts/clearNfts")
  },
  }

</script>

<style src="../Dashboard/Dashboard.scss" lang="scss" />
