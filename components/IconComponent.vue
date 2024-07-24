<template>
  <figure :class="`icon ${name}-icon`">
    <InlineSvg v-if="!error" :src="iconSrc" @error="handleError" />
  </figure>
</template>

<script>
import { ref, computed } from "vue";
import InlineSvg from "vue-inline-svg";

export default {
  name: "IconComponent",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    InlineSvg,
  },
  setup(props) {
    const error = ref(false);

    const iconSrc = computed(() => {
      return `./assets/icons/${props.name}.svg`;
    });

    const handleError = () => {
      error.value = true;
    };

    return {
      error,
      iconSrc,
      handleError,
    };
  },
};
</script>

<style scoped>
/* Add any styles for your icon component here */
</style>
