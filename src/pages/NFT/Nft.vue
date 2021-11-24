<template>
  <div class="dashboard-page">
    <h1 class="page-title">NFT's</h1>
    <b-row>
      <b-col>   
<div>
    <b-table striped hover :items="nfts">
      <template #cell(name)="data">
        <span v-html="data.value"></span></template>
    </b-table>
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
  name: 'Nft',
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

  beforeDestroy(){
 return this.$store.dispatch("accounts/clearNfts")
  },
  }

</script>

<style src="../Dashboard/Dashboard.scss" lang="scss" />
