<template>
  <div class="spinner__container">
    <div class="spinner__spinner"></div>
    <div class="spinner__spinner"></div>
    <div class="spinner__spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style lang="scss">
@import '@/styles';

.spinner {
  &__container {
    position: relative;
    display: grid;
    place-items: center;
    height: $feedback-image-preview-height;
  }

  &__spinner {
    position: absolute;
    width: $space--lg;
    height: $space--lg;
    margin: 4px;
    border: 4px solid transparent;
    border-radius: 50%;
    border-color: $gray--light transparent transparent transparent;
    animation: spin 1200ms cubic-bezier(.5, 0, .5, 1) infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
