<template>
  <main class="base">
    <Documentation :documentation="documentation" />
    <Sidebar />
  </main>
</template>

<script>
import content from '@/content/give-boxing';
import Documentation from './components/Documentation';
import Sidebar from './components/Sidebar';

export default {
  name: 'Give',
  components: {
    Documentation,
    Sidebar,
  },
  computed: {
    documentation() {
      return content.documentation;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles";

.base {
  display: grid;
  grid-template-columns: 1fr 450px;
}
</style>
