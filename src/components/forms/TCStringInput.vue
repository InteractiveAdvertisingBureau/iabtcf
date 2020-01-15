<template>
  <b-row>
    <b-col cols="10">
    <b-form-input
      class="tcstring-input"
      v-model="tcstring"
      @click="selectContents"
      plaintext
    />
    </b-col>
    <b-col cols="2">
      <b-button 
        class="view-decoded"
        variant="outline-watermelon"
        size="sm" :href="'#/decode#' + tcstring">View Decoded</b-button>
    </b-col>
  </b-row>
</template>

<script lang="ts">

import {TCString} from '@iabtcf/core';
import {Component} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component
export default class extends FormComponent {

  private tcstring_: string;

  private get tcstring(): string {

    return TCString.encode(this.tcModel);

  }

  private selectContents(e: MouseEvent): void {

    if (e && e.target && e.target) {

      (e.target as HTMLInputElement).select();

    }

  }

}

</script>
