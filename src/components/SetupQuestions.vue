<template>
  <section class="setup-questions">
    <div class="setup-questions__questions">
      <transition-group name="short-slide-vertical" mode="in-out">
        <div v-for="(question, index) in showingQuestionInputs" :key="index" class="setup-questions__question question">
          <textarea rows="1" placeholder="e.g. How can the legend be improved?" class="setup-questions__question-input question-input" @input="updateInput($event)"></textarea>
          <RemoveIcon v-if="index !== showingQuestionInputs - 1" class="setup-questions__question-remove" @click="removeInput(index)" />
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RemoveIcon from '@/assets/icons/RemoveIcon';

export default {
  name: 'SetupQuestions',
  components: {
    RemoveIcon,
  },
  data() {
    return {
      maxNumOfQuestions: 3,
    };
  },
  computed: {
    ...mapGetters('setup', {
      questions: 'questions',
    }),
    numOfQuestions() {
      if (this.questions.length > this.maxNumOfQuestions) {
        return this.maxNumOfQuestions;
      }
      return this.questions.length;
    },
    underMaxNumOfQuestions() {
      return this.numOfQuestions <= this.maxNumOfQuestions;
    },
    showingQuestionInputs() { // make sure there is always at least one input visible + there are never more than this.maxNumOfQuestions visible
      if (this.numOfQuestions >= this.maxNumOfQuestions) return this.maxNumOfQuestions;
      return this.numOfQuestions + 1;
    },
  },
  methods: {
    ...mapActions('setup', {
      updateQuestions: 'updateQuestions',
    }),
    updateInput(e) {
      // update input height
      const maxHeight = 48; // single-line height = 29px, every line after increases the height by 19px --> maxHeight = 67px (29px + (number-of-lines * 19px))
      e.target.style.height = 'auto'; // decreases height if user removes a line of text and the textarea needs to shrink instead of grow
      e.target.style.height = e.target.scrollHeight > maxHeight ? `${maxHeight}px` : `${e.target.scrollHeight}px`; // increases textarea height whenever the text overflows

      // update state
      const inputEls = this.$el.querySelectorAll('.question-input');
      const input = Array.from(inputEls, (el) => el.value);
      const filteredInput = input.filter((str) => str.trim() !== '');
      this.updateQuestions(filteredInput);
    },
    removeInput(index) {
      const questions = this.questions; // prevent side effects by by assigning 'this.questions' to 'questions'
      questions.splice(index, 1);

      this.updateQuestions(questions);
      this.syncTemplateWithState();
    },
    async syncTemplateWithState() {
      const inputEls = this.$el.querySelectorAll('.question-input');
      inputEls.forEach((input, i) => input.value = this.questions[i] || '');
    },
  },
  mounted() {
    this.syncTemplateWithState();

    // set textarea heights to match input from state
    const maxHeight = 48; // single-line height = 29px, every line after increases the height by 19px --> maxHeight = 67px (29px + (number-of-lines * 19px))
    const inputEls = this.$el.querySelectorAll('.question-input');

    inputEls.forEach((el) => {
      el.style.height = el.scrollHeight > maxHeight ? `${maxHeight}px` : `${el.scrollHeight}px`; // increases textarea height whenever the text overflows
    });
  },
};
</script>

<style lang="scss">
@import '@/styles';

.setup-questions {
  &__question {
    display: flex;
    align-items: center;
    margin-bottom: $space--sm;

    &-input {
      overflow-x: hidden;
      overflow-y: scroll;
      padding: $space--xsm;
      width: 100%;
      color: $black;
      font-size: $font-size--md;
      border: 1px solid $black;
      border-radius: $border-radius;
    }

    &-remove {
      box-sizing: content-box;
      overflow: visible;
      padding: $space--xsm $space--sm $space--xsm 15px;
      fill: $black;
      cursor: pointer;
      transition: color 500ms $ease--fast;

      &:hover {
        fill: $purple;
      }
    }
  }
}
</style>
