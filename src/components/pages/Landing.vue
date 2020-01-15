<template>
  <div>
    <b-row>
      <b-col 
        cols="2">
        <b-card
          header="TC String"
          class="b-card">
          <ul>
            <li>
              <router-link to="encode">Encode</router-link>
            </li>
            <li>
              <router-link to="decode">Decode</router-link>
            </li>
          </ul>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col 
        cols="2">
        <b-card
          header="External Links"
          class="b-card">
          <ul>
            <li>
              <a href="https://github.com/chrispaterson/iabtcf">
                TCF Code Library Github
              </a>
            </li>
            <li>
              <a href="https://iabtechlab.com/">iab. Tech Lab</a>
            </li>
            <li>
              <a href="https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework">
                iab. TCF Github
              </a>
            </li>
          </ul>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

// eslint-disable-next-line
@Component({
  components: {
  },
})
export default class Landing extends Vue {
}
</script>
