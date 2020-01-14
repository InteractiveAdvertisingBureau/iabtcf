<template>
  <b-container fluid>
      <a href="https://github.com/InteractiveAdvertisingBureau/iabtcf"><img width="32" height="32" src="assets/GitHub-Mark-32px.png" class="forkin-github" alt="Fork me on GitHub" data-recalc-dims="1"></a>
    <b-row>
      <b-col cols="12">
        <Nav />
      </b-col>
    </b-row>
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

@Component({
  router,
  components: {
    Nav,
  },
})
export default class App extends Vue {

  public constructor() {

    super();
    GVL.baseUrl = './vendorlist';

  }

};
</script>
<style lang="scss">
  @import './styles/index.scss';
</style>
