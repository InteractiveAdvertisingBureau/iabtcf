import DecodeInput from '../forms/DecodeInput.vue';
import DecodeOutput from '../forms/DecodeOutput.vue';
import DecodeOutputBits from '../forms/DecodeOutputBits.vue';
import Json from '@iabtcf/core';
import OpenIssueLink from '../OpenIssueLink.vue';
import {Component, Vue} from 'vue-property-decorator';
import {TCModel, GVL, TCString} from '@iabtcf/core';

@Component({
  components: {
    'decode-input': DecodeInput,
    'decode-output': DecodeOutput,
    'decode-output-bits': DecodeOutputBits,
    'open-issue-link': OpenIssueLink,

  },
})
export default class TCStringDecode extends Vue {

  private tcString = '';

  private created(): void {

    if(this.$route.query?.tcstring) {

      this.tcString = this.$route.query.tcstring as string;

    }

  }

}
