<script setup lang="ts">
  import TextInput from '../components/share/TextInput.vue';

  const config = useRuntimeConfig();
  const inputValue = ref('');

  console.log(config.public.apiUrl);
</script>

<template>
  <v-col>
    <h1 class="text-4xl font-bold text-blue-500">
      Hello Nuxt + Vuetify + TailwindCSS!
    </h1>
    <v-btn color="primary">Vuetify Button</v-btn>
    <TextInput v-model="inputValue" label="Enter your name" />
  </v-col>
</template>
