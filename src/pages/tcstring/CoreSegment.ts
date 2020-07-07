import {Component, Vue} from 'vue-property-decorator';
import {
  TCModel, TCString, GVL, Segment,
} from '@iabtcf/core';

@Component({
  components: {},
})
export default class extends Vue {

  private isReady = false;
  private tcModel: TCModel | null = null;
  private expandedSegment: string = Segment.CORE;
  private segments = Segment;

  private async created(): Promise<void> {

  }

}
