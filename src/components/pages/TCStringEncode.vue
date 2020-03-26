<template>
  <div>
  <template v-if="!isReady">
    <p>Loading...</p>
    <b-spinner></b-spinner>
  </template>
  <template v-if="isReady">
    <form>
      <b-row>
        <b-col cols="12">
          <b-card
              class="b-card"
              header="TC String"
            >
            <tc-string-input
              :tcModel="tcModel"
            />
            <open-issue-link></open-issue-link>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">
          <b-card
            header="Meta Data"
            class="b-card">
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
                :label="formField.text"
                :tc-model="tcModel"
                :id="formField.value"
                :key="formField.value"
              />
              <form-select
                label="Vendor List Version"
                :tc-model="tcModel"
                :options="vendorListVersions"
                id="vendorListVersion"
              />
              <form-select
                label="Consent Language"
                :tc-model="tcModel"
                :options="languages"
                id="consentLanguage"
              />
              <form-select
                label="Pub Country Code"
                :tc-model="tcModel"
                :options="countries"
                id="publisherCountryCode"
              />
            </b-card>
          </b-col>

          <b-col cols="3">
            <b-card
              header="Vendors"
              class="b-card">
              <big-form-select
                label="Vendor Consents"
                :tc-model="tcModel"
                :options="vendors"
                id="vendorConsents"
              />
              <big-form-select
                label="Vendor Legitimate Interest"
                :tc-model="tcModel"
                :options="vendors"
                id="vendorLegitimateInterests"
              />
              <big-form-select
                label="OOB Vendors Allowed"
                :tc-model="tcModel"
                :options="vendors"
                id="vendorsAllowed"
              />
            </b-card>
          </b-col>
          <b-col cols="3">
            <b-card
              header="Purposes & Special Features"
              class="b-card">
              <big-form-select
                label="Purpose Consents"
                :tc-model="tcModel"
                :options="purposes"
                id="purposeConsents"
              />
              <big-form-select
                label="Purpose Legitimate Interest"
                :tc-model="tcModel"
                :options="purposes"
                id="purposeLegitimateInterests"
              />
              <big-form-select
                label="Special Feature Optins"
                :tc-model="tcModel"
                :options="specialFeatures"
                id="specialFeatureOptins"
              />
            </b-card>
          </b-col>
          <b-col cols="4">
            <b-card
              class="b-card">

              <checkbox-boolean
                v-for="field in boolFields"
                :id="field.value"
                :label="field.text"
                :tc-model="tcModel"
                :key="field.value"
              />
            </b-card>
          </b-col>
      </b-row>
    </form>
  </template>
  </div>
</template>

<script lang="ts" src='./TCStringEncode.ts'></script>
