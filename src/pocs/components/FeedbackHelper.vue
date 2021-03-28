<template>
  <section class="feedback-helper">
    <h1 v-if="title">{{ title }}</h1>
    <p v-if="body">{{ body }}</p>

    <ul v-if="zeroTips" v-show="showFeedbackHelperZero">
      <li v-for="tip in zeroTips" :key="tip">{{ tip }}</li>
    </ul>

    <ul v-if="interactiveTips" v-show="!showFeedbackHelperZero" class="feedback-helper__tips-list">
      <li v-for="(tip, index) in interactiveTips" :key="tip" class="feedback-helper__tips-tip"
        :class="{ 'feedback-helper__tips-tip--expanded': activeTipIndex === index }" @click="handleClick(index)">
        <span class="feedback-helper__tips-tip-icon-container">
          <ToggleIcon class="feedback-helper__tips-tip-icon" />
        </span>
        <span class="feedback-helper__tips-tip-detail-container">
          {{ tip.heading }}
          <span v-show="activeTipIndex === index"  class="feedback-helper__tips-tip-detail">{{ tip.detail }}</span>
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import ToggleIcon from '@/assets/icons/ToggleIcon';
import { mapGetters } from 'vuex';

export default {
  name: 'feedbackHelper',
  components: {
    ToggleIcon,
  },
  props: ['content'],
  data() {
    return {
      activeTipIndex: null,
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      showFeedbackHelperZero: 'showFeedbackHelperZero',
    }),
    title() {
      return this.content.title;
    },
    body() {
      const currentSection = this.showFeedbackHelperZero ? 'zero' : 'interactive';
      return this.content.sections[currentSection].body;
    },
    zeroTips() {
      return this.content.sections.zero.tips;
    },
    interactiveTips() {
      return this.content.sections.interactive.tips;
    },
  },
  methods: {
    handleClick(index) {
      this.activeTipIndex = (this.activeTipIndex === index) ? null : index;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.feedback-helper {
  &__tips {
    &-list {
      list-style: none;
      margin: 0;
    }

    &-tip {
      display: flex;
      margin: $space--sm 0;
      padding:  0 0 $space--sm 0;
      cursor: pointer;

      &:not(:last-of-type) {
        border-bottom: $border--ui;
      }

      &:hover & {
        &-icon {
          fill: $black;
        }

        &-detail {
          color: $gray--dark;

          &-container {
            color: $black;
          }
        }
      }

      &--expanded & {
        &-icon svg {
          transform: rotate(180deg);
        }

        &-detail {
          &-container {
            position: relative;
            left: 1px;
          }
        }
      }

      &-icon {
        padding-left: 2px;
        fill: $gray--dark;

        svg {
          transform-origin: center;
          transition: all 500ms $ease;
        }

        &-container {
          display: flex;
          width: 15px;
          margin: 0 $space--sm;
        }
      }

      &-detail {
        display: block;
        padding-top: $space--xsm;
        font-size: 14px;
        line-height: 1.2;
      }
    }
  }
}
</style>
