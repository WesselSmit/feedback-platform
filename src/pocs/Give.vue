<template>
  <main class="base">
    <Documentation :content="documentation" />
    <Sidebar :content="{ documentation, sidebar }" :stepIndex="stepIndex" />
  </main>
</template>

<script>
import content from '@/blueprints/give-boxing';
import Documentation from '@/pocs/components/Documentation';
import Sidebar from '@/pocs/components/Sidebar';
import { mapGetters } from 'vuex';

export default {
  name: 'Give',
  components: {
    Documentation,
    Sidebar,
  },
  computed: {
    ...mapGetters('sidebar', {
      stepIndex: 'stepIndex',
    }),
    documentation() {
      return content.documentation;
    },
    sidebar() {
      return content.sidebar;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles";

.base {
  display: grid;
  grid-template-columns: 1fr $sidebar-width;
}
</style>
