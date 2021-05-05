<template>
  <section class="setup-limits">
    <div class="setup-limits__limits">
      <div v-for="(limit, index) in showingLimitInputs" :key="index" class="setup-limits__limit limit">
        <input type="text" placeholder="Enter a limit" class="setup-limits__limit-input limit-input" @input="updateInput()">
        <RemoveIcon v-if="index !== showingLimitInputs - 1" class="setup-limits__limit-remove" @click="removeInput(index)" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RemoveIcon from '@/assets/icons/RemoveIcon';

export default {
  name: 'SetupLimits',
  components: {
    RemoveIcon,
  },
  data() {
    return {
      maxNumOfLimits: 3,
    };
  },
  computed: {
    ...mapGetters('setup', {
      limits: 'limits',
    }),
    numOfLimits() {
      if (this.limits.length > this.maxNumOfLimits) {
        return this.maxNumOfLimits;
      }
      return this.limits.length;
    },
    underMaxNumOfLimits() {
      return this.numOfLimits <= this.maxNumOfLimits;
    },
    showingLimitInputs() { // make sure there is always at least one input visible + there are never more than this.maxNumOfLimits visible
      if (this.numOfLimits >= this.maxNumOfLimits) return this.maxNumOfLimits;
      return this.numOfLimits + 1;
    },
  },
  methods: {
    ...mapActions('setup', {
      updateLimits: 'updateLimits',
    }),
    updateInput() {
      const inputEls = this.$el.querySelectorAll('.limit-input');
      const input = Array.from(inputEls, (el) => el.value);
      const filteredInput = input.filter((str) => str !== '');

      this.updateLimits(filteredInput);
    },
    removeInput(index) {
      const limits = this.limits; // prevent side effects by by assigning 'this.limits' to 'limits'
      limits.splice(index, 1);

      this.updateLimits(limits);
      this.syncTemplateWithState();
    },
    async syncTemplateWithState() {
      const inputEls = this.$el.querySelectorAll('.limit-input');
      inputEls.forEach((input, i) => input.value = this.limits[i] || '');
    },
  },
  mounted() {
    this.syncTemplateWithState();
  },
};
</script>

<style lang="scss">
@import '@/styles';

.setup-limits {
  &__limit {
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
