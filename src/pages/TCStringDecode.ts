import TCStringInput from '../components/forms/TCStringInput.vue';
import OpenIssueLink from '../components/OpenIssueLink.vue';
import {Component, Vue} from 'vue-property-decorator';
import {
  Base64Url,
  BitLength,
  FieldSequence,
  IntEncoder,
  PurposeRestrictionVector,
  Segment,
  SegmentIDs,
  TCModel,
  TCString,
  Vector,
} from '@iabtcf/core';

@Component({
  components: {
    'tc-string-input': TCStringInput,
    'open-issue-link': OpenIssueLink,

  },
})

export default class TCStringDecode extends Vue {

  private tcString = '';
  private uniqueNum = 0;
  private error: Error | null = null;
  private fieldSequence = new FieldSequence();
  private tcModel: TCModel;

  private created(): void {

    if (this.$route.query?.tcstring) {

      this.tcString = this.$route.query.tcstring as string;
      this.tcModel = TCString.decode(this.tcString);

    }

  }

  private getClass(value: unknown): string {

    let result = 'code-ish item-' + (typeof value);

    if (value instanceof Date) {

      result = 'code-ish item-date';

    } else if (typeof value !== 'object') {

      result += ' single-decoded-value';

    }

    return result;

  }

  private getEncodingTypeLabel(bits: string): string {

    const encodingType = bits.substr(BitLength.numEntries, 1);
    let result = 'bitfield';

    if (encodingType === '1') {

      result = 'range';

    }

    return result;

  }

  private keyToTitle(key: string): string {

    let retr = key.replace(/([A-Z])/g, ' $1');
    retr = retr.replace(/^./, (str) => str.toUpperCase());

    return retr;

  }

  private formatValue(value: Vector | Date | string | boolean | number | null): string {

    let retr = '';

    switch (typeof value) {

      case 'string':

        retr = `"${value}"`;
        break;

      case 'object':

        if (value instanceof Date) {

          retr += value;

        } else if (value instanceof Vector) {

          if ( value.size === 0) {

            retr += '0';

          } else {

            value.forEach((bool: boolean, id: number): void => {

              if (bool) {

                retr += id;

                if (id !== value.maxId) {

                  retr += ', ';

                }

              }

            });

          }

        }

        break;
      default:

        retr += value;

    }

    return retr;

  }

  private isVector(thing: unknown): thing is Vector {

    return thing instanceof Vector;

  }

  private isPurposeRestrictionVector(thing: unknown): thing is PurposeRestrictionVector {

    return thing instanceof PurposeRestrictionVector;

  }

  private getNumItems(key: string): number {

    const value = this.tcModel[key];
    let retr = 0;

    if (value instanceof Vector) {

      retr = value.size;

    } else if (value instanceof PurposeRestrictionVector) {

      retr = value.numRestrictions;

    }

    return retr;

  }

  private get segments(): Map<Segment, Map<string, string>> {

    const result = new Map();

    try {

      this.tcModel = TCString.decode(this.tcString);

      this.error = null;

    } catch (err) {

      this.error = err;

    }

    let segments: string[];

    if (this.tcString) {

      segments = this.tcString.split('.');
      segments.forEach((segment: string, idx: number): void => {

        const decoded = Base64Url.decode(segment);
        let segKey: Segment;

        if (idx === 0) {

          segKey = Segment.CORE;

        } else {

          const segTypeBits: string = decoded.substr(0, BitLength.segmentType);
          segKey = SegmentIDs.ID_TO_KEY[IntEncoder.decode(segTypeBits, BitLength.segmentType).toString()];

        }

        let curPosition = 0;
        const bitMap = new Map();

        if (segKey !== Segment.CORE) {

          curPosition = BitLength.segmentType;

        }

        this.fieldSequence[this.tcModel.version.toString()][segKey].forEach((field: string): void => {

          if (BitLength[field]) {

            bitMap.set(field, decoded.substr(curPosition, BitLength[field]));
            curPosition += BitLength[field];

          } else {

            const bitLength = this.tcModel[field].bitLength;
            bitMap.set(field, decoded.substr(curPosition, bitLength));
            curPosition += bitLength;

          }

        });

        result.set(segKey, bitMap);

      });

    }

    return result;

  }

}
