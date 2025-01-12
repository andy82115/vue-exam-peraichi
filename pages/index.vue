<script setup lang="ts">
  import TextInput from '../components/share/TextInput.vue';
  import SelectInput from '../components/share/SelectInput.vue';

  const config = useRuntimeConfig();
  const inputValue = ref('');
  const selected = ref()

  console.log(config.public.apiUrl);
</script>

<template>
  <v-col>
    <h1 class="text-4xl font-bold text-blue-500">
      Hello Nuxt + Vuetify + TailwindCSS!
    </h1>
    <v-btn color="primary">Vuetify Button</v-btn>
    <TextInput v-model="inputValue" label="Enter your name" />
    <SelectInput v-model="selected" label="hellow" :options="['a','b','c','d','e']" />
  </v-col>
</template>
