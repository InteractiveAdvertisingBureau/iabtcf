<template>
  <div class="decoded-output-bits">
    <b-card
       v-for="(segment, name) in decodedSegments"
       :header="keyToTitle(name)"
       >
      <pre>{{ segment }}</pre>
    </b-card>
  </div>
</template>

<script lang="ts">

import {Base64Url, BitLength, SegmentIDs, IntEncoder} from '@iabtcf/core';
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component
export default class DecodeOutputBits extends FormComponent {

  @Prop(String)
  private tcString: string; 

  private addSpaces(str: string): string {

    const spaceAt = 6;
    let retr = '';

    for(let i: number = 0; i < str.length; i++) {

      if(i !== 0 && i % 6 === 0) {

        retr += ' ';

      }

      retr += str[i];

    }

    return retr;

  }

  private keyToTitle(key: string): string {

    key = key.replace(/([A-Z])/g, ' $1');
    return key.replace(/^./, str => str.toUpperCase());
  }

  private get decodedSegments(): {[segmentName:string]:string} {

    let retr = {};
    let segments: string[];

    if(this.tcString) {

      segments = this.tcString.split('.');

      try {

        segments.forEach((segment:string, idx: number): void => {

          const decoded = Base64Url.decode(segment);
          let segKey = '';

          if(idx === 0) {

            segKey = 'Core';

          } else {

            const segTypeBits: string = decoded.substr(0, BitLength.segmentType);
            segKey = SegmentIDs.ID_TO_KEY[IntEncoder.decode(segTypeBits, BitLength.segmentType).toString()];

          }

          retr[segKey] = this.addSpaces(decoded);

        });

      } catch(err) {

      }

    }

    return retr;

  }

}

</script>
