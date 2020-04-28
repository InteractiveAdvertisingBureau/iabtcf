<template>
  <b-input-group>
    <b-form-group
      :label-for="id"
      :label="label"
    >
      <b-form-select
        :id="id"
        v-model="selected"
        select-size="8"
        :options="options"
        class="mt-3"
        multiple
        @input="changeValue"
      />
    </b-form-group>
  </b-input-group>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';
import {FormField} from './FormField';

@Component
export default class extends FormComponent {

  @Prop()
  public options: FormField[];

  private selected: string[] = [];

}
</script>
