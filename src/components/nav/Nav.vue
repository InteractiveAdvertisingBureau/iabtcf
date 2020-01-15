<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      fixed="top">

      <b-navbar-brand>
        <router-link to="/">
          @iabtcf
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle
      target="nav-collapse"/>

      <b-collapse
        id="nav-collapse"
        is-nav>

        <b-navbar-nav>

          <b-nav-item
            v-for="(link, idx) in links"
            :key="idx"
          >
            <router-link 
              :to="link.path"
              >
              {{ link.title }}
            </router-link>

          </b-nav-item>

        </b-navbar-nav>

      </b-collapse>
      <a href="https://github.com/InteractiveAdvertisingBureau/iabtcf"><img width="32" height="32" src="assets/GitHub-Mark-32px.png" class="github-link" alt="Fork me on GitHub" data-recalc-dims="1"></a>

    </b-navbar>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SectionModel} from '../../model/SectionModel';
import {LinkModel} from '../../model/LinkModel';

// eslint doesn't like these decorators...
// eslint-disable-next-line
@Component

export default class Nav extends Vue {

  public sectionModel: SectionModel = new SectionModel();
  public get links(): LinkModel[] {

    const retr: LinkModel[] = [];

    this.sections.forEach((sectionName) => {

      const links = this.sectionModel.get(sectionName);
      links.forEach((link) => retr.push(link) );

    });

    return retr;

  }
  public get sections(): string[] {

    return Array.from(this.sectionModel.keys());

  }

}
</script>
<style scoped>
</style>
