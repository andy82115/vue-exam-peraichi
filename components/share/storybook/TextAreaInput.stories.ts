import type { Meta, StoryObj } from '@storybook/vue3';
import TextAreaInput from '../TextAreaInput.vue';

const meta: Meta<typeof TextAreaInput> = {
  title: 'Components/TextAreaInput',
  component: TextAreaInput,
  argTypes: {
    modelValue: {
      description: 'The value of the textarea (used with v-model)',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'The label text displayed above the textarea',
      control: { type: 'text' },
    },
    rules: {
      description: 'Validation rules for the textarea',
      control: { type: 'object' },
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
      template: '<div class="w-fit h-fit flex"><story /></div>'
    })
  ],
};

export default meta;

type Story = StoryObj<typeof TextAreaInput>;

export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: 'Description',
  },
};

export const WithInitialValue: Story = {
  args: {
    modelValue: 'sss',
    placeholder: 'Description',
  },
};
