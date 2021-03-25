<template>
  <main class="base">
    <Documentation :content="documentation" />
    <Sidebar :content="sidebar" :stepIndex="stepIndex" />
  </main>
</template>

<script>
import content from '@/content/give-boxing';
import Documentation from '@/pocs/components/Documentation';
import Sidebar from '@/pocs/components/Sidebar';

export default {
  name: 'Give',
  components: {
    Documentation,
    Sidebar,
  },
  data() {
    return {
      stepIndex: 1, // from DB (+ in store)
    };
  },
  computed: {
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
