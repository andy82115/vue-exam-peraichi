import type { Meta, StoryObj } from '@storybook/vue3';
import SelectInput from '../SelectInput.vue';

const meta: Meta<typeof SelectInput> = {
  title: 'Components/SelectInput',
  component: SelectInput,
  argTypes: {
    modelValue: {
      description: 'The selected value of the select input (used with v-model)',
      control: { type: 'text' },
    },
    label: {
      description: 'The label text displayed above the select input',
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
};

export default meta;

type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  args: {
    modelValue: '',
    label: 'Choose a fruit',
    options: ['a', 'b', 'c', 'e', 'f'],
  },
};
