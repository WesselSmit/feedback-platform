<template>
  <section class="setup-questions">
    <div class="setup-questions__questions">
      <div v-for="(question, index) in showingQuestionInputs" :key="index" class="setup-questions__question question">
        <input type="text" placeholder="Enter a question" class="setup-questions__question-input question-input" @input="updateInput()">
        <RemoveIcon v-if="index !== showingQuestionInputs - 1" class="setup-questions__question-remove" @click="removeInput(index)" />
      </div>
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
    updateInput() {
      const inputEls = this.$el.querySelectorAll('.question-input');
      const input = Array.from(inputEls, (el) => el.value);
      const filteredInput = input.filter((str) => str !== '');

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
