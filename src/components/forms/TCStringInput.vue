<template>
  <div
    class="tcstring"
  >
    <b-row>
      <b-col>
        <b-form-input
          v-model="tcstring"
          @click="selectContents"
        />
      </b-col>
    </b-row>
    <b-row
      v-if="tcstring"
    >
      <b-col cols="11">
        <div class="file-issue-text">
    &nbsp;&nbsp;
          <a
            href="https://github.com/InteractiveAdvertisingBureau/iabtcf-es/tree/master/modules/core"
            target="_blank"
          >@iabtcf/core</a>
          version {{ coreVersion }}
          <a
            href="https://github.com/InteractiveAdvertisingBureau/iabtcf-es/issues/new/choose"
            target="_blank"
          >
            open an issue
            <img src="assets/external-link.png">
          </a>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">

declare const CORE_VERSION: string;

import {TCModel, TCString} from '@iabtcf/core';
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component
export default class extends Vue {

  @Prop(Object)
  private tcModel: TCModel;

  private selectContents(e: MouseEvent): void {

    if (e?.target) {

      (e.target as HTMLInputElement).select();

    }

  }

  private get tcstring(): string {

    return TCString.encode(this.tcModel);

  }

  private get coreVersion(): string {

    return CORE_VERSION;

  }

}

</script>
