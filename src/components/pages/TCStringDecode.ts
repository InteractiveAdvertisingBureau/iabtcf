import DecodeInput from '../forms/DecodeInput.vue';
import DecodeOutput from '../forms/DecodeOutput.vue';
import DecodeOutputBits from '../forms/DecodeOutputBits.vue';

import {Component, Vue} from 'vue-property-decorator';
import {TCModel, GVL, TCString} from '@iabtcf/core';
import Json from '@iabtcf/core';

GVL.baseUrl = document.location.origin;

@Component({
  components: {
    'decode-input': DecodeInput,
    'decode-output': DecodeOutput,
    'decode-output-bits': DecodeOutputBits,

  },
})
export default class TCStringDecode extends Vue {

  private tcString = '';

  private created(): void {

    if(document.location.hash.split('#')[2] !== undefined) {

      this.tcString = document.location.hash.split('#')[2];

    }  
  }

}
