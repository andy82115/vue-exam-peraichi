import type { Meta, StoryObj } from '@storybook/vue3';
import RemovableImage from '../RemovableImage.vue';

const meta = {
  title: 'Components/RemovableImage',
  component: RemovableImage,
  argTypes: {
    imgSrc: {
      description: 'The URL of the image to display',
      control: { type: 'text' },
    },
    onCancel: {
      description: 'Event emitted when the cancel button is clicked',
      action: 'cancel',
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
} satisfies Meta<typeof RemovableImage>;

export default meta;

type Story = StoryObj<typeof RemovableImage>;

export const Default: Story = {
  args: {
    imgSrc: 'https://dummyimage.com/250x250/000/fff',
  },
};

export const WithCustomImage: Story = {
  args: {
    imgSrc: 'https://dummyimage.com/600x400/000/fff',
  },
};
