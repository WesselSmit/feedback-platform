<template>
  <section class="pop-up">
    <div class="pop-up__inner">
      <h1>{{ title }}</h1>
      <p class="pop-up__body" :class="{ 'pop-up__body--extra-margin-bottom': hasTipsSection }">{{ body }}</p>

      <div v-if="hasTipsSection">
        <h2>{{ tipHeading }}</h2>

        <ul>
          <li v-for="tip in tips" :key="tip">{{ tip.label }}</li>
        </ul>
      </div>

     <button class="pop-up__button" @click="handleClick(button)">{{ buttonLabel }}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PopUp',
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
    handleClick() {
      this.$store.dispatch('sidebar/updateShowPopUp');
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
  height: 100vh;
  width: 100vw;
  background-color: $white--overlay;

  * > *:last-child {
    margin-bottom: 0;
  }

  &__inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: $popup-width;
    padding: $space--sm-md;
    background-color: $white;
    border: $border--ui;
    border-radius: $border-radius;
  }

  &__body {
    &--extra-margin-bottom {
      margin-bottom: $space--md;
    }
  }

  &__button {
    display: block;
    margin: $space--lg 0 0 auto;
    height: $button-height;
    width: 150px;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: $border-radius;
    transition: background-color 500ms $ease;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }
  }
}
</style>

//todo (questions + limits) moeten weer iconen hebben maar het moet ook mogelijk zijn om standaard bullet points te gebruiken als het type 'normal' is
