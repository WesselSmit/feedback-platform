<template>
  <section class="pop-up">
    <div class="pop-up__inner">
      <h1>{{ title }}</h1>
      <p class="pop-up__body" :class="{ 'pop-up__body--extra-margin-bottom': hasTipsSection }">{{ body }}</p>

      <div v-if="hasTipsSection">
        <h3>{{ tipHeading }}</h3>

        <ul class="pop-up__tip-list">
          <li v-for="tip in tips" :key="tip" class="pop-up__tip" :class="`pop-up__tip--${ tip.type }`">
            <span v-if="tip.type !== 'normal'" class="pop-up__tip-icon-container">
              <QuestionIcon v-if="tip.type === 'question'" class="pop-up__tip-icon--question" />
              <LimitIcon v-if="tip.type === 'limit'" class="pop-up__tip-icon--limit" />
            </span>
            {{ tip.label }}
          </li>
        </ul>
      </div>

     <button class="pop-up__button" @click="handleClick(button)">{{ buttonLabel }}</button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import LimitIcon from '@/assets/icons/LimitIcon';
import QuestionIcon from '@/assets/icons/QuestionIcon';

export default {
  name: 'PopUp',
  components: {
    LimitIcon,
    QuestionIcon,
  },
  props: ['content'],
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    hasTipsSection() {
      return this.content.tipHeading && this.content.tips?.length > 0;
    },
    tipHeading() {
      return this.content.tipHeading;
    },
    tips() {
      return this.content.tips;
    },
    buttonLabel() {
      return this.content.buttonLabel;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateShowPopUp: 'updateShowPopUp',
    }),
    handleClick() {
      this.updateShowPopUp();
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-color: $white--overlay;

  * > *:last-child {
    margin-bottom: 0;
  }

  &__inner {
    @include zoomIn(500ms, 50ms, $ease--fast);
    width: $popup-width--large;
    padding: $space--sm-md;
    background-color: $white;
    opacity: 0;
    border: $border--ui;
    border-radius: $border-radius;
  }

  &__body {
    &--extra-margin-bottom {
      margin-bottom: $space--md;
    }
  }

  &__tip {
    &--question,
    &--limit {
      position: relative;
      left: -28px;
      display: flex;
      align-items: center;
      list-style-type: none;
    }

    &-icon {
      &--question {
        fill: $green;
      }

      &--limit {
        fill: $red;
      }

      &-container {
        display: flex;
        justify-content: center;
        width: 15px;
        margin: 3px 13px 0 0; // 13px to line icons up with the default bullet points
      }
    }
  }

  &__button {
    display: block;
    margin: $space--lg 0 0 auto;
    height: $button-height;
    width: $button-width;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: $border-radius;
    transition: background-color 500ms $ease--fast;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }
  }
}
</style>
