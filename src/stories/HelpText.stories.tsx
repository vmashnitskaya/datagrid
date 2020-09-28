import React from 'react';
import { Meta, Story } from '@storybook/react';
import HelpText, { HelpTextProps } from '../components/Table/HelpText';

export default {
    title: 'HelpText',
    component: HelpText,
} as Meta;

const Template: Story<HelpTextProps> = (args: HelpTextProps) => <HelpText {...args} />;

export const HelpTextSelect = Template.bind({});

HelpTextSelect.args = {
    value: 'Select filter criteria and click Filter.',
};

export const HelpTextString = Template.bind({});

HelpTextString.args = {
    value: 'Enter filter criteria and click Enter.',
};
