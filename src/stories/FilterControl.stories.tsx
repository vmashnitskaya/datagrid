import React from 'react';
import { Meta, Story } from '@storybook/react';
import FilterControl, { FilterControlProps } from '../components/Table/Filtering/FilterControl';

export default {
    title: 'FilterControl',
    component: FilterControl,
} as Meta;

const Template: Story<FilterControlProps> = (args: FilterControlProps) => (
    <FilterControl {...args} />
);

export const FilterControlNotActive = Template.bind({});

FilterControlNotActive.args = {
    currentElementColumnName: 'first_name',
    filteredColumnAndValue: {
        id: '',
        first_name: '',
        last_name: '',
        date: '',
        email: '',
        gender: '',
        location: '',
    },
    disabled: false,
};

FilterControlNotActive.parameters = {
    backgrounds: {
        values: [{ name: 'red', value: '#f00' }],
    },
};

export const FilterControlActive = Template.bind({});

FilterControlActive.args = {
    currentElementColumnName: 'first_name',
    filteredColumnAndValue: {
        id: '',
        first_name: '111',
        last_name: '',
        date: '',
        email: '',
        gender: '',
        location: '',
    },
    disabled: false,
};

FilterControlActive.parameters = {
    backgrounds: {
        values: [{ name: 'red', value: '#f00' }],
    },
};
