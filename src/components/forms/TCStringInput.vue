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
      <router-link :to="{ path: 'decode', query: {tcstring:tcstring}}">
        <b-button 
          class="view-decoded"
          variant="outline-watermelon"
          size="sm" 
          :href="href" @click="navigate">
            View Decoded
        </b-button>
      </router-link>
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
