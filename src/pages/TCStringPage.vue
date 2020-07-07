<template>
  <div>
    <div
      v-if="isReady"
      class="tcstring-main-body"
    >
      <form>
        <b-row>
          <b-col>
            <TCStringInput
              :tc-model="tcModel"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card
              v-for="segment in segments"
              :key="segment"
              no-body
              class="mb-1"
            >
              <b-card-header
                class="segment-head"
                @click="expandedSegment = segment"
              >
                {{ segment.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) }}
              </b-card-header>
              <b-collapse
                :class="'collapse-' + segment"
                :visible="segment === expandedSegment"
              >
                This is some sample text for {{ segment }}
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
      </form>
    </div>

    <div v-else>
      <p>Loading...</p>
      <b-spinner />
    </div>
  </div>
</template>

<script lang="ts" src='./TCStringPage.ts'></script>
