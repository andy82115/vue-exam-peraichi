/** @type { import('@storybook/vue3').Preview } */
import { setup } from '@storybook/vue3';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
// import { Preview } from "@storybook/vue3";

import 'vuetify/styles';

import '../assets/main.css';

const vuetify = createVuetify({
  components,
  directives,
});

setup((app) => {
  app.use(vuetify);
});

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<v-app><story /></v-app>',
      vuetify,
    }),
  ],
};

export default preview;
