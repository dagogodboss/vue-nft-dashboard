<template>
  <div class="dashboard-page">
    <h1 class="page-title">NFT's</h1>
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
import {mapState } from 'vuex';


export default {
  name: 'Nft',
  components: {
    Widget, BigStat, 
  },
  data() {
    return {
      mock,
       items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
    };
  },
  methods: {
      
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;},
      
  
  
   
    getRevenueData() {
      const data = [];
      const seriesCount = 3;
      const accessories = ['SMX', 'Direct', 'Networks'];

      for (let i = 0; i < seriesCount; i += 1) {
        data.push({
          label: accessories[i],
          data: Math.floor(Math.random() * 100) + 1,
        });
      }

      return data;
    }
  },
  computed: {
  ...mapState('accounts',['nfts']),
  },}
</script>

<style src="../Dashboard/Dashboard.scss" lang="scss" />
