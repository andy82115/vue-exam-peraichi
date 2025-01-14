import type { Meta, StoryObj } from '@storybook/vue3';
import FormLabel from '../FormLabel.vue';

const meta = {
  title: 'Components/FormLabel',
  component: FormLabel,
  argTypes: {
    labelText: {
      description: 'The text to display as the label',
      control: { type: 'text' },
    },
    labelRequired: {
      description: 'Whether to show the required or optional badge',
      control: { type: 'boolean' },
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
    layout: 'centered',
  },
} satisfies Meta<typeof FormLabel>;

export default meta;

type Story = StoryObj<typeof FormLabel>;

export const Default: Story = {
  args: {
    labelText: 'お名前',
    labelRequired: true,
  },
};
