import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=3', alt: 'Alice Johnson' },
}

export const Initials: Story = {
  args: { alt: 'Alice Johnson', name: 'Alice Johnson' },
}

export const FallbackIcon: Story = {
  args: { alt: '' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Avatar key={size} size={size} alt={`Avatar ${size}`} name="Alice Johnson" />
      ))}
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar shape="circle" alt="Circle" name="Alice Johnson" />
      <Avatar shape="square" alt="Square" name="Alice Johnson" />
    </div>
  ),
}
