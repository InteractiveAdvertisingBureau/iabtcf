<template>
  <div>
    <div
      class="tcstring-input"
      v-model="tcstringDecoded"
      > 
    </div>
      <div 
        class="decoded-output"
        v-html="tcstringDecoded" 
        >
    </div>
  </div>
</template>

<script lang="ts">

import {TCString, Vector, PurposeRestrictionVector, PurposeRestriction, GVL} from '@iabtcf/core';
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component
export default class extends FormComponent {

  private tcstringDecoded_: string;
  
  private print(key: string | number, value: string | number | boolean | object | undefined, indent = 0): string {

    const indentString = '&nbsp;&nbsp;'.repeat(indent);
    let printedKey:string = key + '';
    let str = '';

    if(printedKey.charAt(printedKey.length - 1) === '_') {
      printedKey = printedKey.substr(0, printedKey.length - 1);
    }


    switch (typeof value) {

      case 'string':
        str += `<div><span class="item-key">${indentString}${printedKey}:</span> <span class="item-string">"${value}"</span></div>`;
        break;
      case 'number':
        str += `<div><span class="item-key">${indentString}${printedKey}:</span> <span class="item-number">${value}</span></div>`;
        break;
      case 'boolean':
        str += `<div><span class="item-key">${indentString}${printedKey}:</span> <span class="item-boolean">${value}</span></div>`;
        break;
      case 'object':
        if (value instanceof Date) {

          str += `<div><span class="item-key">${indentString}${printedKey}:</span> <span class="item-date">${(value as Date).toString()}</span></div>`;

        } else if (value === null) {

          str += `<div><span class="item-key">${indentString}${printedKey}:</span> <span class="item-null">${value}</span></div>`;

        } else if (value instanceof Vector) {


          if(!value.size) {
            return str;
          }
          str += `<div>${indentString}<span class="item-key-only">${printedKey}</span></div><div class="output-item-list">`;
          value.forEach((bool: boolean, id: number): void => {

            str += this.print(id, bool, indent + 1);

          });
          str += '</div>';

        } else if (value instanceof PurposeRestrictionVector) {
          if(!value.numRestrictions) {
            return str;
          }
          str += `<div>${indentString}<span class="item-key-only">${printedKey}</span></div>`;
          value.getRestrictions().forEach((purpRestriction: PurposeRestriction): void => {

            str += `<div><span class="item-key">${indentString}&nbsp;&nbsp;Purpose ${purpRestriction.purposeId} -> Restriction Type: ${purpRestriction.restrictionType}</span></div>`;
            str += this.print('Vendors', value.getVendors(purpRestriction), indent + 2);

          });
        } else if (value instanceof GVL) {

            return str;
        } else {

          str += `<div>${indentString}<span class="item-key-only">${printedKey}</span></div>`;
          Object.keys(value).forEach((key: string): void => {

            str += this.print(key, value[key], indent + 1);

          });

        }

        break;

    }

    return str;

};

  private get tcstringDecoded(): string {

    let retr = '';

    if(this.tcModel.cmpId) {

      retr = this.print('TCModel', this.tcModel);

    } else {

      retr = 'Invalid TC String';
    }
    return retr;

  }

}

</script>
