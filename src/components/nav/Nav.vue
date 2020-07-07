<template>
  <b-navbar
    toggleable="lg"
    type="light"
    sticky
  >
    <b-container fluid="lg">
      <b-navbar-brand>
        <router-link
          class="home-link"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 260 245"
            width="30"
            height="28"
          >
            <path d="m55,237 74-228 74,228L9,96h240" />
          </svg>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle
        target="nav-collapse"
      />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
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
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <b-nav-text>
              Tools for the
              <a href="https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework">
                GDPR Transparency and Consent Framework (TCF)
              </a>
              <a href="https://github.com/InteractiveAdvertisingBureau/iabtcf-es">
                <img
                  width="32"
                  height="32"
                  src="assets/GitHub-Mark-32px.png"
                  class="github-link"
                  alt="Fork me on GitHub"
                  data-recalc-dims="1"
                >
              </a>
            </b-nav-text>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SectionModel} from '../../model/SectionModel';
import {LinkModel} from '../../model/LinkModel';

// eslint doesn't like these decorators...
// eslint-disable-next-line
@Component({
  components: {},
})

export default class Nav extends Vue {

  public sectionModel: SectionModel = new SectionModel();

  private created(): void {

    window.onscroll = this.onScroll;

  }
  private onScroll(): void {

    let percent = document.documentElement.scrollTop/100;
    const navItems = document.getElementsByClassName('nav-item');
    const brandItems = document.getElementsByClassName('navbar-brand');

    if (percent > 1) {

      percent = 1;

    }

    for ( let i = 0; i < navItems.length; i++ ) {

      const navItem = navItems[i] as HTMLElement;
      navItem.style.marginTop = 0 - (20*percent) + 'px';
      navItem.style.marginBottom = 0 - (20*percent) + 'px';

    }

    for ( let i = 0; i < brandItems.length; i++ ) {

      const brand = brandItems[i] as HTMLElement;
      brand.style.marginTop = 0 - (20*percent) + 'px';
      brand.style.marginBottom = 0 - (20*percent) + 'px';

    }

  }
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
