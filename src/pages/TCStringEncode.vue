<template>
  <div>
    <template v-if="!isReady">
      <p>Loading...</p>
      <b-spinner />
    </template>
    <template v-if="isReady">
      <form>
        <b-row>
          <b-col>
            <tc-string-input
              :tcstring="tcstring"
            />
          </b-col>
          <b-col cols="1">
            <router-link :to="{ path: 'decode', query: {tcstring:tcstring}}">
              <a
                :href="href"
                class="decode-link"
                @click="navigate"
              >
                Decode ⮀
              </a>
            </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2">
            <date-field
              id="created"
              label="Created Date"
              :tc-model="tcModel"
            />
            <date-field
              id="lastUpdated"
              label="Last Updated Date"
              :tc-model="tcModel"
            />
            <text-field
              v-for="formField in formFields"
              :id="formField.value"
              :key="formField.value"
              :label="formField.text"
              :tc-model="tcModel"
            />
            <form-select
              id="vendorListVersion"
              label="Vendor List Version"
              :tc-model="tcModel"
              :options="vendorListVersions"
            />
            <form-select
              id="consentLanguage"
              label="Consent Language"
              :tc-model="tcModel"
              :options="languages"
            />
            <form-select
              id="publisherCountryCode"
              label="Pub Country Code"
              :tc-model="tcModel"
              :options="countries"
            />
          </b-col>

          <b-col cols="3">
            <big-form-select
              id="vendorConsents"
              label="Vendor Consents"
              :tc-model="tcModel"
              :options="vendors"
            />
            <big-form-select
              id="vendorLegitimateInterests"
              label="Vendor Legitimate Interest"
              :tc-model="tcModel"
              :options="vendors"
            />
            <big-form-select
              id="vendorsAllowed"
              label="OOB Vendors Allowed"
              :tc-model="tcModel"
              :options="vendors"
            />
          </b-col>
          <b-col cols="3">
            <big-form-select
              id="purposeConsents"
              label="Purpose Consents"
              :tc-model="tcModel"
              :options="purposes"
            />
            <big-form-select
              id="purposeLegitimateInterests"
              label="Purpose Legitimate Interest"
              :tc-model="tcModel"
              :options="purposes"
            />
            <big-form-select
              id="specialFeatureOptins"
              label="Special Feature Optins"
              :tc-model="tcModel"
              :options="specialFeatures"
            />
          </b-col>
          <b-col cols="4">
            <checkbox-boolean
              v-for="field in boolFields"
              :id="field.value"
              :key="field.value"
              :label="field.text"
              :tc-model="tcModel"
            />
          </b-col>
        </b-row>
      </form>
    </template>
  </div>
</template>

<script lang="ts" src='./TCStringEncode.ts'></script>
