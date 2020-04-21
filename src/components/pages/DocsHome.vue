<template>
<b-card>
  <b-row>
    <nav></nav>
    <b-col>
      <h1>Documentation</h1>
    </b-col>
  </b-row>
</b-card>
</template>

<script lang="ts" >
import {Component, Vue} from 'vue-property-decorator';
import DocsNav from '../nav/DocsNav';

@Component({
  components: {
    'nav': DocsNav
  }
})
export default class DocsHome extends Vue {}
</script>
