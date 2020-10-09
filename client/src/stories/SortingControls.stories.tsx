import React from 'react';
import { Meta, Story } from '@storybook/react';
import SortingControls, { SortingControlsProps } from '../components/Table/Sorting/SortingControls';

export default {
    title: 'SortingControls',
    component: SortingControls,
} as Meta;

const Template: Story<SortingControlsProps> = (args: SortingControlsProps) => (
    <SortingControls {...args} />
);

export const SortingControlsNotActive = Template.bind({});

SortingControlsNotActive.args = {
    currentElementColumn: 'first_name',
    sortingColumn: 'last_name',
    sorting: 'up',
};

export const SortingControlsActive = Template.bind({});

SortingControlsActive.args = {
    currentElementColumn: 'first_name',
    sortingColumn: 'first_name',
    sorting: 'up',
};
