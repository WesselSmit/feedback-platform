<template>
  <section class="insights">
    <h1 v-if="title && hasInsights" class="insights__title">{{ title }}</h1>

    <ul class="insights__list">
      <li v-for="insight in insights" :key="insight.data" class="insights__insight">
        <div class="insights__insight-meta">
          <Avatar v-if="insight.data.user" :user="insight.data.user" size="small" class="insights__insight-avatar" />
          <div class="insights__insight-credentials">
            <h3 class="insights__insight-name">{{ insight.data.user.name }}</h3>
            <p class="insights__insight-role">{{ insight.data.user.role }}</p>
          </div>
        </div>
      {{ insight.data.insight }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Avatar from '@/components/Avatar';

export default {
  name: 'Insights',
  props: ['content'],
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters('feedback', {
      insights: 'insights',
    }),
    hasInsights() {
      return this.insights.length > 0;
    },
    title() {
      return this.content.title;
    },
  },
  methods: {
    ...mapActions('feedback', {
      getInsights: 'getInsights',
    }),
  },
  created() {
    this.getInsights();
  },
};
</script>

<style lang="scss">
@import '@/styles';

.insights {
  &__title,
  &__body {
    padding: 0
  }

  &__list {
    margin: $space--md 0 0 0;
    list-style: none;

    &:empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: calc(#{$sidebar-width} - (2 * #{$space--md}));
      height: calc(#{100vh} - (2 * #{$space--lg}));
      margin: auto;
      padding: 0 $space--lg;

      &::before {
        content: "No insights found.";
        display: block;
        margin: 0 auto $space--sm;
        font-size: $font-size--xl;
        font-family: $font;
        color: $black;
        text-align: center;
      }

      &::after {
        content: "Everyone's insights will be visible here.";
        display: block;
        margin: 0 auto;
        text-align: center;
      }
    }
  }

  &__insight {
    display: flex;
    flex-direction: column;
    padding: 0;
    line-height: 1.2;

    &:not(:last-of-type) {
      margin-bottom: $space--md;
    }

    &-meta {
      display: flex;
      align-items: center;
      margin-bottom: $space--xsm;
    }

    &-avatar {
      margin: 0 $space--sm 0 0;
    }

    &-credentials {
      display: flex;
      align-items: baseline;
    }

    &-name {
      margin-bottom: 0;
      margin-right: $space--sm;
      text-transform: capitalize;
    }

    &-role {
      margin: 0;
      color: $gray--dark;
      font-size: $font-size--sm;
      text-transform: capitalize;
    }
  }
}
</style>
