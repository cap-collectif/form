import { IntlProvider } from 'react-intl'
import { CapUIProvider } from '@cap-collectif/ui'
import { createGlobalStyle } from 'styled-components'

const GlobalCSS = createGlobalStyle`
  html, body {
    font-size: 14px
  }
`
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  controls: {
    matchers: {
      color: /(background|color|bgColor|bg)/,
      date: /(date|createdAt|endAt|startAt|updatedAt|deletedAt)$/i,
    },
  },
}

export const decorators = [
  Story => (
    <CapUIProvider>
      <GlobalCSS />
      <IntlProvider locale="fr-FR">
        <Story />
      </IntlProvider>
    </CapUIProvider>
  ),
]
