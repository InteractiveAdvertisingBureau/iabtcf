import TCStringInput from '../components/forms/TCStringInput.vue';
import {Component, Vue} from 'vue-property-decorator';
import {
  TCModel, TCString, GVL, Segment,
} from '@iabtcf/core';

@Component({
  components: {
    TCStringInput,
  },
})
export default class extends Vue {

  private isReady = false;
  private tcModel: TCModel | null = null;
  private expandedSegment: string = Segment.CORE;
  private segments = Segment;

  private async created(): Promise<void> {

    GVL.baseUrl = './vendorlist';

    if (this.$route.query?.tcstring) {

      this.tcModel = TCString.decode(this.$route.query.tcstring as string);
      this.tcModel.gvl = new GVL(this.tcModel.vendorListVersion);

    } else {

      this.tcModel = new TCModel(new GVL());

    }

    this.tcModel.cmpId = 23;
    this.tcModel.cmpVersion = 2;

    await this.tcModel.gvl.readyPromise;

    this.isReady = true;

  }

}
