import type { Meta, StoryObj } from '@storybook/vue3';
import DateInput from '../DateInput.vue';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {
    modelValue: {
      description: 'The selected date (used with v-model)',
      control: { type: 'text' },
    },
    label: {
      description: 'The label text displayed above the date input',
      control: { type: 'text' },
    },
    rules: {
      description: 'Validation rules for the date input',
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
      template: '<div class="w-full h-fit flex"><story /></div>'
    })
  ],
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {
    modelValue: '2023/01/01',
    label: 'Enter Date (YYYY/MM/DD)',
  },
};

export const WithValidationRules: Story = {
  args: {
    modelValue: '',
    label: 'Enter Date (YYYY/MM/DD)',
    rules: [
      (v: string) =>
        /^[0-9]{4}\/([0-9]{2})\/([0-9]{2})$/.test(v) || 'Invalid date format',
    ],
  },
};
