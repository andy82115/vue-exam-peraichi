import type { Meta, StoryObj } from '@storybook/vue3';
import TextareaInput from '../TextAreaInput.vue';

const meta: Meta<typeof TextareaInput> = {
  title: 'Components/TextareaInput',
  component: TextareaInput,
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
};

export default meta;

type Story = StoryObj<typeof TextareaInput>;

export const Default: Story = {
  args: {
    modelValue: 'This is a sample text.',
    placeholder: 'Description',
  },
};
