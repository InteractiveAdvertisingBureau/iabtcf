<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <form>
          <tc-string-input
            :tcstring="tcString"
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
                cols="6"
              >
                <span
                  class="item-key"
                >
                  {{ keyToTitle(item[0]) }}
                </span>
                <span
                  class="bits"
                >
                  {{ item[1].length }} bit{{ isVector(tcModel[item[0]]) ? 's ' + getEncodingTypeLabel(item[1]) + ' encoded' : item[1].length === 1 ? '' : 's' }}: {{ item[1] }}
                </span>
              </b-col>
              <b-col
                cols="6"
                :class="getClass(tcModel[item[0]])"
              >
                {{ formatValue(tcModel[item[0]]) }}
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
