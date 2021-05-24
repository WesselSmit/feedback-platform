<template>
  <section class="input-instructions">
    <h1 v-if="title" class="input-instructions__header-title">{{ title }}</h1>
    <p v-if="body" class="input-instructions__body">{{ body }}</p>

    <div v-if="disclaimer" class="input-instructions__disclaimer-container">
      <p class="input-instructions__disclaimer">{{ disclaimer }}</p>
    </div>

    <ul  v-if="tips" class="input-instructions__tip-list">
      <li v-for="tip in tips" :key="tip" class="input-instructions__tip">{{ tip }}</li>
    </ul>

    <textarea rows="6" placeholder="Note your insights" v-model.trim="insightInput" class="input-instructions__input"></textarea>
  </section>
</template>

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
    disclaimer() {
      return this.content.disclaimer;
    },
    tips() {
      return this.content.tips || null;
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
  &__disclaimer {
    margin: $space--xsm 0;
    font-size: $font-size--sm-md;

    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 10px;
      background-color: $gray--light-extra;
      border: 1px solid transparent;
      border-radius: $border-radius;
    }
  }

  &__tip {
    margin-left: $space--md;

    &-list {
      margin: $space--sm 0 $space--md;
    }
  }

  &__input {
    width: 100%;
    padding: $space--xsm;
    background-color: $gray--sidebar;
    border: 1px solid $black;
    border-radius: $border-radius;
  }
}
</style>
