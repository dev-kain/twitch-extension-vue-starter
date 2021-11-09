<template>
  <div class="full-height p-3 bg-black text-white">
    <!-- Your content here -->
  </div>
</template>

<script>
import Twitch from "./mixins/twitch";

export default {
  mixins: [Twitch],

  data() {
    return {};
  },

  mounted: function () {
    this.$twitch().listen("broadcast", (target, contentType, msg) => {
      this.$debug("Broadcast received");
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Inter&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<style scoped>
.full-height {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}
</style>
