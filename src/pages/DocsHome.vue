<template>
  <div>
    <b-row>
      <b-col>
        <h1>Documentation</h1>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts" >

import {Component, Vue} from 'vue-property-decorator';
import DocsNav from '../components/nav/DocsNav';

@Component({
  components: {
    'nav': DocsNav,
  },
})

export default class DocsHome extends Vue {}

</script>
