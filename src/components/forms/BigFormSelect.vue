<template>
  <b-input-group >
    <b-form-group
      :label-for="id"
      :label="label"
    >
      <b-form-select
        :id="id"
        select-size="8"
        :options="options"
        @input="changeValue"
        class="mt-3"
        multiple
        v-model="selected"
      />

    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';
import FormField from './FormField';

@Component
export default class extends FormComponent {

  @Prop()
  public options: FormField[];

  private selected: string[] = [];

}
</script>
