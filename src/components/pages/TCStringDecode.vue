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
          </b-card>
        </b-col>
      </b-row>

      <b-row
            v-if="tcString"
        >
        <b-col cols="12">
          <b-card
               header="Decoded TC String"
            bg-variant="light"
            class="b-card">
            <decode-output
              :tcString="tcString"
            />
          </b-card>
        </b-col>
      </b-row>

    </form>
  </template>
  </div>
</template>

<script lang="ts" src='./TCStringDecode.ts'></script>
