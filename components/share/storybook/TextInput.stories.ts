import type { Meta, StoryObj } from '@storybook/vue3';
import TextInput from '../TextInput.vue';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput', // 組件在 Storybook 中的路徑
  component: TextInput,
  argTypes: {
    modelValue: {
      description: 'The value of the text field (used with v-model)',
      control: { type: 'text' }, // 控制類型
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
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    modelValue: 'llllllll',
    label: 'UserName',
  },
};

export const WithInitialValue: Story = {
  args: {
    modelValue: 'JohnDoe',
    label: 'Username',
  },
};
