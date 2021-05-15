<template>
  <section v-if="!hideSection" class="feedback-helper">
    <transition name="slide-horizontal" mode="out-in">
      <div v-if="zeroTips && showFeedbackHelperZero" class="anim-side--left">
        <div class="feedback-helper__header">
          <h2 v-if="title" class="feedback-helper__title">{{ title }}</h2>
          <div class="feedback-helper__toggle-container">
            <ToggleIcon class="feedback-helper__toggle feedback-helper__toggle--zero" :class="{ 'feedback-helper__toggle--disabled': showFeedbackHelperZero }" />
            <ToggleIcon class="feedback-helper__toggle feedback-helper__toggle--interactive" :class="{ 'feedback-helper__toggle--disabled': !showFeedbackHelperZero }" @click="switchHelper()" />
          </div>
        </div>
        <p v-if="body">{{ body }}</p>

        <ul>
          <li v-for="tip in zeroTips" :key="tip">{{ tip }}</li>
        </ul>
      </div>

      <div v-else-if="interactiveTips && !showFeedbackHelperZero" class="anim-side--right">
        <div class="feedback-helper__header">
          <h2 v-if="title" class="feedback-helper__title">{{ title }}</h2>
          <div class="feedback-helper__toggle-container">
            <ToggleIcon class="feedback-helper__toggle feedback-helper__toggle--zero" :class="{ 'feedback-helper__toggle--disabled': showFeedbackHelperZero }" @click="switchHelper()" />
            <ToggleIcon class="feedback-helper__toggle feedback-helper__toggle--interactive" :class="{ 'feedback-helper__toggle--disabled': !showFeedbackHelperZero }" />
          </div>
        </div>
        <p v-if="body">{{ body }}</p>

        <ul class="feedback-helper__tips-list">
          <li v-for="(tip, index) in interactiveTips" :key="tip" class="feedback-helper__tips-tip"
            :class="{ 'feedback-helper__tips-tip--expanded': activeTipIndex === index }" @click="handleClick(index)">
            <span class="feedback-helper__tips-tip-icon-container">
              <ToggleIcon class="feedback-helper__tips-tip-icon" />
            </span>
            <span class="feedback-helper__tips-tip-detail-container">
              {{ tip.heading }}
              <span class="feedback-helper__tips-tip-detail">{{ tip.detail }}</span>
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ToggleIcon from '@/assets/icons/ToggleIcon';

export default {
  name: 'feedbackHelper',
  components: {
    ToggleIcon,
  },
  props: ['content'],
  computed: {
    ...mapGetters('sidebar', {
      showFeedbackHelperZero: 'showFeedbackHelperZero',
      activeTipIndex: 'activeTipIndex',
    }),
    currentSection() {
      return this.showFeedbackHelperZero ? 'zero' : 'interactive';
    },
    hideSection() {
      return this.content.sections[this.currentSection].hide;
    },
    title() {
      return this.content.sections[this.currentSection].title;
    },
    body() {
      return this.content.sections[this.currentSection].body;
    },
    zeroTips() {
      return this.content.sections.zero.tips;
    },
    interactiveTips() {
      return this.content.sections.interactive.tips;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateActiveTipIndex: 'updateActiveTipIndex',
      updateShowFeedbackHelperZero: 'updateShowFeedbackHelperZero',
    }),
    handleClick(index) {
      this.updateActiveTipIndex((this.activeTipIndex === index) ? null : index);
      this.scrollToInput();
    },
    scrollToInput() {
      const input = document.getElementById('input');
      setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 175);
    },
    switchHelper() {
      this.updateShowFeedbackHelperZero();
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.feedback-helper {
  &__title {
    margin-top: 3px; // needed to align title with toggle-icon
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $space--md;
    width: $space--md;
    fill: $black;
    border: 1px solid transparent;
    border-radius: $border-radius;
    cursor: pointer;
    transition: all 500ms $ease--fast;

    &:hover {
      background-color: $purple--opacity;
      fill: $purple;
    }

    svg {
      transform-origin: center;
      transition: all 500ms $ease--fast;
    }

    &--zero {
      transform: rotate(90deg);
    }

    &--interactive {
      transform: rotate(270deg);
    }

    &--disabled {
      fill: $gray--light;
      cursor: default;

      &:hover {
        background-color: $white;
        fill: $gray--light;
      }
    }

    &-container {
      display: flex;
    }
  }

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
          max-height: 200px; // is needed for the height transition (set the max-height to something bigger than the element will ever be)
          transition: max-height 500ms ease;
        }
      }

      &-icon {
        padding-left: 2px;
        fill: $gray--dark;

        svg {
          transform-origin: center;
          transition: all 500ms 50ms $ease--fast;
        }

        &-container {
          display: flex;
          width: 15px;
          margin: 0 $space--sm;
        }
      }

      &-detail {
        overflow: hidden;
        display: block;
        max-height: 0; // is needed for the height transition
        padding-top: $space--xsm;
        font-size: 14px;
        line-height: 1.2;
        transition: max-height 150ms ease;
      }
    }
  }
}
</style>
