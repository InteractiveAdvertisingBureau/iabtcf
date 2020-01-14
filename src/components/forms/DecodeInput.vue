<template>
  <b-form-group
    description="Please enter an encoded TC string"
    >
    <b-form-input
      class="tcstring-input"
      v-model="tcString"
      @click="selectContents"
      @input="$emit('update:tcString', tcString)"
    />
  </b-form-group>
</template>

<script lang="ts">

import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component
export default class DecodeInput extends FormComponent {

  @Prop()
  private tcString: string

  private selectContents(e: MouseEvent): void {

    if (e && e.target && e.target) {

      (e.target as HTMLInputElement).select();

    }

  }
  
}

</script>
