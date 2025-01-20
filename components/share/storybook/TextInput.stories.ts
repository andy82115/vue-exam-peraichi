import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import TextInput from '../TextInput.vue';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    modelValue: {
      description: 'The value of the text field (used with v-model)',
      control: { type: 'text' },
    },
    label: {
      description: 'The label text displayed above the text field',
      control: { type: 'text' },
    },
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="w-full h-fit flex"><story /></div>'
    })
  ],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'UserName',
  },
};

export const WithInitialValue: Story = {
  args: {
    modelValue: 'JohnDoe',
    label: 'Username',
  },
};