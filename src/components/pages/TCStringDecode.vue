<template>
  <div>
  <template>
    <form>

      <b-row>
        <b-col cols="8">
          <b-card
           header="TC String"
            class="b-card">
            <decode-input
              :encodedTCString="tcString"
              @decode="decode"
            />
          </b-card>
        </b-col>
      </b-row>

      <b-row
         v-if='tcModel.cmpId'
        >
        <b-col cols="8">
          <b-card
               header="Decoded TC String"
            bg-variant="light"
            class="b-card">
            <decode-output
              :tcModel="tcModel"
            />
          </b-card>
        </b-col>
      </b-row>

    </form>
  </template>
  </div>
</template>

<script lang="ts" src='./TCStringDecode.ts'></script>
