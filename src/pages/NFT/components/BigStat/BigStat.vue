<template>
  <div class="mb-xlg">
    <Widget
      class="h-100"
      bodyClass="p-0 mt-0"
    >
      <div class="d-flex justify-content-between flex-wrap px-4">
        <h5 class='d-flex align-items-center pb-1 bigStatTitle'>
          <span :class="`circle bg-${color} mr-sm`" :style="{ fontSize: '6px' }" />
            Total <span class="fw-normal ml-xs">{{product}}</span>
        </h5>
        <b-dropdown :text="text" variant="default" size="sm">
          <b-dropdown-item-button @click="changeText('Daily')">Daily</b-dropdown-item-button>
          <b-dropdown-item-button @click="changeText('Weekly')">Weekly</b-dropdown-item-button>
          <b-dropdown-item-button @click="changeText('Yearly')">Yearly</b-dropdown-item-button>
        </b-dropdown>
      </div>
      <div class="px-5">
        <h4 class="fw-semi-bold mb-sm mt-sm">{{total}}</h4>
        <div class="d-flex">
          <div class="w-50 py-3 pr-2">
            
            <p class="text-muted mb-0 mr"><small>Registered</small></p>
          </div>
          <div class="w-50 py-3 pl-2">
            
          </div>
        </div>
      </div>
    </Widget>
  </div>
</template>

<script>
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';

export default {
  name: 'BigStat',
  props: ['product', 'color', 'total', 'registrations', 'bounce'],
  components: { Widget },
  data() {
    return {
      text: 'Daily',
    };
  },
  methods: {
    changeText(text) {
      Vue.set(this, 'text', text);
    },
  },
};
</script>

<style src="./BigStat.scss" lang="scss" scoped />
