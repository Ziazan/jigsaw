import './../src/styles/index.scss';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
const { withPropsTable } = require('storybook-addon-react-docgen');

addDecorator(
  withInfo({
    header: false,
  })
);
addDecorator(withPropsTable);
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
