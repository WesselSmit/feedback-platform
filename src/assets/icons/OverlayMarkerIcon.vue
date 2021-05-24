<template>
  <svg width="45" height="45" @click="handleClick()">
    <path class="visualisation__marker-glow" :style="{ fill: markerColor }" d="M22.5 45a22.5 22.5 0 100-45 22.5 22.5 0 000 45z" />
    <path class="visualisation__marker-background" :style="{ fill: markerColor }" d="M19 16l-2 1.5-1 5 3.5 6.5 2.5 1.5 2-2 2.5-2 1.5-3 .5-2.5v-1.5l-2-2.5-2-2h-2L19 16z" />
    <path class="visualisation__marker-outline" d="M27.6 21.38c0-3.267-2.385-5.58-5.4-5.58-3.015 0-5.4 2.313-5.4 5.58 0 2.106 1.755 4.896 5.4 8.226 3.645-3.33 5.4-6.12 5.4-8.226zM22.2 14c3.78 0 7.2 2.898 7.2 7.38 0 2.988-2.403 6.525-7.2 10.62-4.797-4.095-7.2-7.632-7.2-10.62 0-4.482 3.42-7.38 7.2-7.38z" />
    <path class="visualisation__marker-dot" d="M22.2 23a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'OverlayMarkerIcon',
  props: ['color'],
  data() {
    return {
      markerColor: null,
    };
  },
  methods: {
    ...mapActions('user', {
      getColorHex: 'getColorHex',
    }),
    handleClick() {
      this.$emit('markerClick');
    },
  },
  async created() {
    if (this.color) {
      const hexColor = await this.getColorHex(this.color);
      this.markerColor = hexColor;
    }
  },
};
</script>
