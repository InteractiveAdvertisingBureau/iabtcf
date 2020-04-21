<template>
  <b-col cols='2'>
    <div role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle.accordion-1 variant="watermelon">TypeScript / JavaScript</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-list-group flush>
              hi...
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block href="#" v-b-toggle.accordion-2 variant="watermelon">Java</b-button>
          </b-card-header>
          <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>Coming soon</b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
  </b-col>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Json} from '@iabtcf/core';

@Component({
  components: {}
})

export default class DocsNav extends Vue {
}
</script>
