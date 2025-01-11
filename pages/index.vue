<script lang="ts" setup>
const config = useRuntimeConfig();
console.log(config.public.apiUrl);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <v-app>
      <v-container>
        <h1 class="text-4xl font-bold text-blue-500">
          Hello Nuxt + Vuetify + TailwindCSS!
        </h1>
        <v-btn color="primary">Vuetify Button</v-btn>
      </v-container>
    </v-app>
  </div>
</template>
