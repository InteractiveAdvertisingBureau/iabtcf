<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <form>
          <decode-input
            :tc-string.sync="tcString"
          />
        </form>
        <open-issue-link />
      </b-col>
    </b-row>

    <b-row
      v-if="tcString"
    >
      <b-col
        v-if="error === null"
        class="decoded-output"
      >
        <b-list-group
          v-for="(segment) in segments"
          :key="segment[0]"
        >
          <b-list-group-item
            class="segment-head"
          >
            <b-row>
              <b-col
                class="item-key"
              >
                {{ keyToTitle(segment[0]) }}
              </b-col>
            </b-row>
          </b-list-group-item>

          <b-list-group-item
            v-for="item in segment[1]"
            :key="item[0]"
          >
            <b-row>
              <b-col
                cols="4"
                class="item-key"
              >
                {{ keyToTitle(item[0]) }}
              </b-col>
              <b-col
                cols="8"
                :class="getClass(tcModel[item[0]])"
              >
                {{ formatValue(tcModel[item[0]]) }}
              </b-col>
            </b-row>
            <b-row>
              <b-col
                v-if="isVector(tcModel[item[0]])"
                class="bits"
              >
                <span
                  class="item-key"
                >
                  {{ item[1].length }} bits {{ getEncodingTypeLabel(item[1]) }} encoded:
                </span>
                {{ item[1] }}
              </b-col>
              <b-col
                v-else
                class="bits"
              >
                <span
                  class="item-key"
                >
                  {{ item[1].length }} bit{{ item[1].length === 1 ? '' : 's' }}:
                </span>
                {{ item[1] }}
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col
        v-else
      >
        <b-list-group>
          <b-list-group-item>
            <b-row>
              <b-col
                class="decode-output-error"
              >
                {{ error }}
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" src='./TCStringDecode.ts'></script>
