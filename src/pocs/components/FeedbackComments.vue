<template>
  <section class="feedback-comments">
    <h1 v-if="title" class="feedback-comments__title">{{ title }}</h1>
    <p v-if="body" class="feedback-comments__body">{{ body }}</p>

    <ul class="feedback-comments__list">
      <li v-for="comment in commentsByTime" :key="comment" class="feedback-comments__comment">
        {{ comment.data }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'feedback-comments',
  props: ['content'],
  computed: {
    ...mapGetters('feedback', {
      comments: 'comments',
    }),
    projectId() {
      return 'poc-give-boxing'; // todo: projectId moet uit database komen (is nu hardcoded voor POC)
    },
    commentsByTime() {
      return [...this.comments].sort((a, b) => b.data.ts - a.data.ts);
    },
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
  },
  created() {
    this.$store.dispatch('feedback/getComments', this.projectId);
  },
};
</script>

<style lang="scss">
@import '@/styles';

.feedback-comments {
  &__title,
  &__body {
    padding: 0 $space--sm-md;
  }

  &__list {
    margin: 0;
    list-style: none;
  }

  &__comment {
    padding: 0 $space--sm-md;

    &:not(:last-of-type) {
      margin-bottom: $space--md;
    }
  }
}
</style>
