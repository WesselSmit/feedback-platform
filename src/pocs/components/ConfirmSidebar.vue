<template>
  <section class="confirm-sidebar">
    <div class="confirm-sidebar__inner">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="body">{{ body }}</p>

      <div class="confirm-sidebar__buttons" :class="{ 'confirm-sidebar__buttons--multiple': hasMultiple }">
        <button v-for="(button, name) in navigation"
          :key="name" class="confirm-sidebar__button"
          :class="{ 'confirm-sidebar__button--outline': button.hasOutline }"
          @click="handleClick(button.action)">
          {{ button.label }}
        </button>
      </div>
    </div>
  </section>
</template>

//todo: als de user op 'Cancel' klikt moeten de NET (dus niet de markers die al bestonden) toegevoegde markers verwijderd worden
//todo: 'add' button moet zonder markers disabled zijn

<script>
export default {
  name: 'ConfirmSidebar',
  props: ['content'],
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    navigation() {
      return this.content.navigation;
    },
    hasMultiple() {
      return this.content.navigation.length > 1;
    },
  },
  methods: {
    handleClick(action) {
      if (action.hasOwnProperty('target')) {
        this.$router.push(action.target);
      }

      switch (action) {
        case 'cancelMarkers':
          this.$store.dispatch('sidebar/updateShowMarkerOverlay', false);
          break;
        case 'saveMarkers':
          this.$store.dispatch('sidebar/updateShowMarkerOverlay', false);
          break;
        default:
          console.log('switch case not handled');
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.confirm-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $space--sm-md;
  width: $sidebar-width;
  min-height: 100vh;
  max-height: 100vh;
  border-left: $border--ui;

  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin: $space--lg 0 0;

    &--multiple {
      justify-content: space-between;
    }
  }

  &__button {
    height: $button-height;
    width: 150px;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 2px solid transparent;
    border-radius: $border-radius;
    transition: background-color 500ms $ease;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--outline {
      border: $border--button;
    }
  }
}
</style>
