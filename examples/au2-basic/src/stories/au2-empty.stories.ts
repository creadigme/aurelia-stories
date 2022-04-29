/* Do not edit this file. This file is generated with @creadigme/aurelia-stories - 29/04/2022, 11:44:18 */
// eslint-disable-next-line prettier/prettier
import Aurelia from 'aurelia';
import { Au2Empty } from './../components/au2-empty';

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'components/au2-empty',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
  },
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = (options) => {
  const host = document.createElement('div');
  host.innerHTML = `<au2-empty  ></au2-empty>`;
  Aurelia.register(Au2Empty).enhance({
    host,
    component: options,
  });
  return host;
};

export const DefaultUsage = Template.bind({});
DefaultUsage.args = {};
DefaultUsage.storyName = 'Default usage';
DefaultUsage.parameters = {
  docs: {
    description: {
      component: "I'm not empty.\n\nI am ?\n",
    },
  },
};


