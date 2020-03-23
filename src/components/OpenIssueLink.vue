<template>
  <div class="file-issue-text"> 
    &nbsp;&nbsp;
    <a href="https://github.com/InteractiveAdvertisingBureau/iabtcf-es/tree/master/modules/core" target="_blank">@iabtcf/core</a> 
    v{{ coreVersion }}
    <a href="https://github.com/InteractiveAdvertisingBureau/iabtcf-es/issues/new/choose" target="_blank">
      open an issue 
      <img src="assets/external-link.png"/>
    </a>
  </div>
</template>

<script lang="ts">

declare const CORE_VERSION: string;

import {Component, Vue} from 'vue-property-decorator';

@Component
export default class extends Vue {

  private get coreVersion(): string {
    return CORE_VERSION;
  }
}

</script>
