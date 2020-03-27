<template>
  <div class="decoded-output">
    <b-card v-for="(segment, segName) in segments" v-if="error === null && segmentHasSomething(segment)" :header="keyToTitle(segName)">
      <b-list-group>
        <div v-for="key in segment">
          <b-list-group-item v-if='isSingleValue(key)'>
            <b-row>
              <b-col cols="4" class="item-key">{{ keyToTitle(key) }}:</b-col>
              <b-col cols="8" :class='getClass(tcModel[key])'>{{ formatValue(tcModel[key]) }}</b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item v-if='!isSingleValue(key) && getNumItems(key) > 0' v-b-toggle="'collapse-' + key" button>
            <b-row>
              <b-col cols="12" class="item-key">
                {{ keyToTitle(key) }} &nbsp;
                <b-badge variant="watermelon" pill>{{ getNumItems(key) }}</b-badge>
              </b-col>
            </b-row>
            <b-collapse :id="'collapse-' + key">
              <b-list-group>
                <b-list-group-item 
                  v-for="tup in tcModel[key]"
                  v-if="isVector(tcModel[key]) && tup[1]" 
                  >
                  <span class="item-key">{{ tup[0] }}: </span>
                  <span :class='getClass(tup[1])'>{{ tup[1] }}</span>
                </b-list-group-item>
                <b-list-group-item 
                  v-if="isPurposeRestrictionVector(tcModel[key])" 
                  v-for="purposeRestriction in tcModel.publisherRestrictions.getRestrictions()"
                  v-b-toggle="'collapse-' + purposeRestriction.purposeId + ':' + purposeRestriction.restrictionType">
                    {{ 'Purpose ' + purposeRestriction.purposeId + ' Restriction Type ' + purposeRestriction.restrictionType }}
                    <b-collapse :id="'collapse-' + purposeRestriction.purposeId + ':' + purposeRestriction.restrictionType">
                      <b-list-group>
                        <b-list-group-item v-for="vendor in tcModel.publisherRestrictions.getVendors(purposeRestriction)">
                          {{ vendor }}
                        </b-list-group-item>
                      </b-list-group>
                    </b-collapse>
                </b-list-group-item>
              </b-list-group>
            </b-collapse>
          </b-list-group-item>
        </div>
      </b-list-group>
    </b-card>
    <b-card v-if="error !== null" header="Error">
      <b-row>
        <b-col cols="12">
          <pre class="decode-output-error">
            {{ error }}
          </pre>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts">

// v-html="tcstringDecoded" 
import {TCModel, TCString, Vector, PurposeRestrictionVector, PurposeRestriction, GVL, FieldSequence} from '@iabtcf/core';
import {Component, Prop} from 'vue-property-decorator';
import {FormComponent} from './FormComponent';

@Component
export default class DecodeOutput extends FormComponent {

  @Prop()
  private tcString: string; 
  private uniqueNum = 0;
  private error: Error | null = null;
  private fieldSequence = new FieldSequence();

  private getClass(value: any): string {

    if(value instanceof Date) {

      return 'item-date';

    } else {

      return 'item-' + (typeof value);
    }

  }

  private keyToTitle(key: string): string {

    let retr = key.replace(/([A-Z])/g, ' $1');
    retr = retr.replace(/^./, str => str.toUpperCase());


    return retr;
  }

  private formatValue(value: string | boolean | number | null): string {

    let retr = '' + value; 

    if(typeof value === "string") {

      retr = `"${retr}"`;

    }

    return retr;

  }

  private isSingleValue(key:string): boolean {

    return (key === "created" || key === "lastUpdated" || typeof this.tcModel[key] !== "object");

  }

  private segmentHasSomething(segment: string[]): boolean {

    const version = this.tcModel.version.toString();

    return segment.some((field: string):boolean => {

      let retr = false;
      const value = this.tcModel[field];




      if(value instanceof Vector) {

        retr = value.size > 0;

      } else if(value instanceof Date) {

        retr = true;

      }

      return retr;
      
    });

  }

  private isVector(thing: any): thing is Vector{

    return thing instanceof Vector;

  }

  private isPurposeRestrictionVector(thing: any): thing is PurposeRestrictionVector {

    return thing instanceof PurposeRestrictionVector ;

  }

  private getNumItems(key:string): number {

    const value = this.tcModel[key];
    let retr = 0;

    if(value instanceof Vector) {

      retr = value.size;

    } else if(value instanceof PurposeRestrictionVector) {

      retr = value.numRestrictions;

    }

    return retr;

  }

  private get segments(): string[][] {

    let retr = [];

    try {

      this.tcModel = TCString.decode(this.tcString);

      const version = this.tcModel.version.toString();
      retr = this.fieldSequence[version];
      this.error = null;

    } catch (err) {

      this.error = err;

    }

    return retr;


  }

}

</script>
