import DecodeInput from '../forms/DecodeInput.vue';
import DecodeOutput from '../forms/DecodeOutput.vue';

import {Component, Vue} from 'vue-property-decorator';
import {TCModel, GVL, TCString} from '@iabtcf/core';
import Json from '@iabtcf/core';

GVL.baseUrl = document.location.origin;

@Component({
  components: {
    'decode-input': DecodeInput,
    'decode-output': DecodeOutput,

  },
})
export default class extends Vue {

  private tcModel: TCModel = new TCModel();
  private tcString: string;

  private created(): void {
    if(document.location.hash.split('#')[2] !== undefined) {

      this.decode(document.location.hash.split('#')[2]);

    }  
  }

  private decode(tcString: string) : void {

    if(tcString) {

      this.tcString = tcString;
      this.tcModel = TCString.decode(tcString);

    }

  }


}
