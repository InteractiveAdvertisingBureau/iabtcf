<template>
  <div>
  <template>
    <b-row>
      <b-col cols="2">
        <b-card
          class="b-card">
          <div v-for="(mod, key) in moduleMap">
            <h5>{{ key }}</h5>
            <ul>
              <li v-for="entry in mod.def">
                <h6>{{ entry.name }}</h6>
              </li>
            </ul>
          </div>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          class="b-card">
        </b-card>
      </b-col>
    </b-row>
  </template>
  </div>
</template>

<script lang="ts" src='./APIDocs.ts'></script>
