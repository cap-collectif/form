import { Meta, Story } from '@storybook/react'
import Test  from './Test'

const meta: Meta = {
    title: 'Test',
    parameters: {
        layout: 'centered',
        controls: { expanded: true },
    },
}

export default meta

export const Default: Story = () => (
    <Test />
)
