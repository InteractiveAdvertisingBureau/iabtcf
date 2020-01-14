<template>
  <b-form-group
    description="Please enter an encoded TC string"
    >
    <b-form-input
      class="tcstring-input"
      v-model="encodedTCString"
      @click="selectContents"
      @input="$emit('decode', encodedTCString)"
      @update="update"
    />
  </b-form-group>
</template>

<script lang="ts">

import {TCString} from '@iabtcf/core';
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component
export default class extends FormComponent {

  @Prop()
  private encodedTCString: string

  private selectContents(e: MouseEvent): void {

    if (e && e.target && e.target) {

      (e.target as HTMLInputElement).select();

    }

  }
  
}

</script>
