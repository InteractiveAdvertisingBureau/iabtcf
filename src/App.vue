<template>
  <div>
    <Nav />
    <b-container fluid>
      <div class="top-space"></div>
      <b-row>
        <b-col cols="12">
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view />
          </transition>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import VueRouter, {RouteConfig} from 'vue-router';
import Nav from './components/nav/Nav.vue';
import {SectionModel} from './model/SectionModel';

// eslint-disable-next-line import/no-named-as-default
import BootstrapVue from 'bootstrap-vue';

import {GVL} from '@iabtcf/core';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

const sectionModel: SectionModel = new SectionModel();
const routes: RouteConfig[] = sectionModel.getRouteConfig();

const router = new VueRouter({routes});

GVL.baseUrl = '/vendorlist';

@Component({
  router,
  components: {
    Nav,
  },
})
export default class App extends Vue {

};
</script>
<style lang="scss">
  @import './styles/index.scss';
</style>
