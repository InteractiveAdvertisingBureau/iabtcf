<template>
  <div>
  <template>
    <form>

      <b-row>
        <b-col cols="12">
          <b-card
           header="TC String"
            class="b-card">
            <decode-input
              :tcString.sync='tcString'
            />
            <open-issue-link></open-issue-link>
          </b-card>
        </b-col>
      </b-row>

      <b-row
            v-if="tcString"
        >
        <b-row>
          <b-col cols="5">
            <decode-output
              :tcString="tcString"
            />
          </b-col>
          <b-col cols="7">
            <decode-output-bits
              :tcString="tcString"
            />
          </b-col>
        </b-row>
      </b-row>

    </form>
  </template>
  </div>
</template>

<script lang="ts" src='./TCStringDecode.ts'></script>
