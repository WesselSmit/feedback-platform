<template>
  <section class="documentation" >
    <Menu :hasBack="true" :hasLogout="false" />

    <div v-if="!hideDocumentation" class="documentation__inner" :class="{ 'documentation__inner--centered': hideVisualisation }">
      <h1>{{ title }}</h1>
      <p class="documentation__explanation">{{ explanation }}</p>
    </div>

    <div :class="{ 'documentation__inner documentation__inner--centered': hideDocumentation }">
      <Visualisation v-if="!hideVisualisation" :class="{ 'no-documentation': hideDocumentation }" :title="title" :visualisation="visualisation" :pageMode="pageMode" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Menu from '@/components/Menu';
import Visualisation from '@/components/Visualisation';

export default {
  name: 'Documentation',
  components: {
    Menu,
    Visualisation,
  },
  props: ['content', 'pageMode'],
  computed: {
    ...mapGetters('sidebar', {
      hideDocumentation: 'hideDocumentation',
      hideVisualisation: 'hideVisualisation',
    }),
    title() {
      return this.content.project.data.title;
    },
    explanation() {
      return this.content.project.data.explanation;
    },
    visualisation() {
      return this.content.project.data.visualisation;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.documentation {
  min-height: 100vh;

  &__inner {
    margin: 0 auto;
    padding: 0 $space--sm-md;
    max-width: calc(#{$documentation-width} - (2 * #{$space--sm-md}));

    &--centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: calc(#{$space--xl / 2});
      height: calc(100% - #{$space--xl});
      max-width: unset;
    }
  }

  &__subheading {
    &:not(:first-of-type) {
      margin-top: $space--lg;
    }
  }

  &__explanation {
    margin-bottom: 0;
  }
}
</style>
