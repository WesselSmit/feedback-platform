<template>
  <section class="input-instructions">
    <h1 v-if="title" class="input-instructions__header-title">{{ title }}</h1>
    <p v-if="body" class="read-instructions__body">{{ body }}</p>

    <textarea rows="6" placeholder="Note your insights" v-model.trim="insightInput" class="input-instructions__input"></textarea>
  </section>
</template>

//todo: veld moet required zijn
//todo: documentation is niet meer zichtbaar bij alle andere stappen
<script>
import { mapActions } from 'vuex';

export default {
  name: 'InputInstructions',
  props: ['content', 'hideDocumentation'],
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    insightInput: {
      get() {
        return this.$store.getters['sidebar/insightInput'];
      },
      set(value) {
        this.updateInsightInput(value);
      },
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateInsightInput: 'updateInsightInput',
      updateHideDocumentation: 'updateHideDocumentation',
    }),
  },
  created() {
    if (this.hideDocumentation) {
      this.updateHideDocumentation(true);
    }
  },
};
</script>

<style lang="scss">
@import '@/styles';

.input-instructions {
  &__input {
    width: 100%;
    padding: $space--xsm;
    border: 1px solid $black;
    border-radius: $border-radius;
  }
}
</style>
