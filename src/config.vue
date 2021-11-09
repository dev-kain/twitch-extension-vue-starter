<template>
  <div class="m-3">
    <form v-on:submit="save" class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div class="">
          <div>
            <h3
              class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
            >
              Your Configuration View
            </h3>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="my_value"
                class="block text-sm font-medium text-gray-700 dark:text-gray-100"
              >
                My Value
              </label>
              <div class="mt-1">
                <input
                  v-model="myValue"
                  type="text"
                  name="my_value"
                  id="my_value"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Twitch from "./mixins/twitch";

const EBS_URL = "https://your-ebs-api.com/api/";

export default {
  mixins: [Twitch],

  data() {
    return {
      myValue: "",
    };
  },

  created: async function () {
    try {
      var resp = await this.$get(`${EBS_URL}/configs`);
      this.myValue = resp.data.config["my_value"];
    } catch (error) {
      this.$error(error);
    }
  },

  methods: {
    save: async function (e) {
      e.preventDefault();
      try {
        await this.$post(`${EBS_URL}/configs`, {
          my_value: this.myValue,
        });
      } catch (error) {
        this.$error(error);
      }
    },
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
</style>
