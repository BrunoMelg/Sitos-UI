import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    intent: 'neutral',
    isDisabled: false,
    isRequired: false,
    isReadOnly: false,
  },
  argTypes: {
    intent: {
      control: 'select',
      options: ['neutral', 'danger', 'success'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Input>

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {}

// ─── With hint ────────────────────────────────────────────────────────────────

export const WithHint: Story = {
  args: {
    hint: "We'll never share your email with anyone.",
  },
}

// ─── Error state ─────────────────────────────────────────────────────────────

export const Error: Story = {
  args: {
    defaultValue: 'not-an-email',
    errorMessage: 'Enter a valid email address.',
  },
}

// ─── Success state ────────────────────────────────────────────────────────────

export const Success: Story = {
  args: {
    intent: 'success',
    defaultValue: 'user@example.com',
    hint: 'Looks good!',
  },
}

// ─── Required ────────────────────────────────────────────────────────────────

export const Required: Story = {
  args: {
    isRequired: true,
    hint: 'This field is required.',
  },
}

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: 'user@example.com',
  },
}

// ─── Read-only ────────────────────────────────────────────────────────────────

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultValue: 'user@example.com',
  },
}

// ─── With adornments ─────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export const WithAdornments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
      <Input
        label="Email address"
        placeholder="you@example.com"
        leadingElement={<MailIcon />}
      />
      <Input
        label="Coupon code"
        placeholder="SAVE20"
        trailingElement={<span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Apply</span>}
      />
      <Input
        label="Search"
        placeholder="Search…"
        leadingElement={<MailIcon />}
        trailingElement={<MailIcon />}
      />
    </div>
  ),
}
