import { ColumnsHeaders } from './ColumnInterface';

const columnHeaders: ColumnsHeaders = {
    locations: [
        {
            header: '',
            name: 'checkbox',
            type: 'checkbox',
            sorting: false,
            filtering: false,
            display: true,
        },
        {
            header: 'City',
            name: 'city',
            type: 'string',
            sorting: true,
            filtering: true,
            display: true,
        },
        {
            header: 'Country',
            name: 'country',
            type: 'string',
            sorting: true,
            filtering: true,
            display: true,
        },
        {
            header: 'State',
            name: 'state',
            type: 'string',
            sorting: true,
            filtering: true,
            display: true,
        },
        {
            header: 'Country code',
            name: 'country_code',
            type: 'string',
            sorting: true,
            filtering: true,
            display: true,
        },
        {
            header: 'Timezone',
            name: 'timezone',
            type: 'string',
            sorting: false,
            filtering: false,
            display: true,
        },
        {
            header: 'Open',
            name: 'open',
            type: 'string',
            sorting: false,
            filtering: false,
            display: true,
        },
    ],
    users: [
        {
            header: '',
            name: 'checkbox',
            type: 'checkbox',
            sorting: false,
            filtering: false,
            display: true,
        },
        {
            header: 'First name',
            name: 'first_name',
            type: 'string',
            sorting: true,
            filtering: true,
            display: true,
        },
        {
            header: 'Last name',
            name: 'last_name',
            type: 'string',
            sorting: true,
            filtering: true,
            display: true,
        },
        {
            header: 'Birth date',
            name: 'date',
            type: 'string',
            sorting: false,
            filtering: false,
            display: true,
        },
        {
            header: 'Email',
            name: 'email',
            type: 'string',
            sorting: false,
            filtering: false,
            display: true,
        },
        {
            header: 'Gender',
            name: 'gender',
            type: 'select',
            options: ['Female', 'Male'],
            sorting: true,
            filtering: true,
            display: true,
        },
        {
            header: 'Job title',
            name: 'job_title',
            type: 'string',
            sorting: true,
            filtering: false,
            display: true,
        },
        {
            header: 'Open',
            name: 'open',
            type: 'string',
            sorting: false,
            filtering: false,
            display: true,
        },
    ],
    apps: [
        {
            header: '',
            name: 'checkbox',
            type: 'checkbox',
            sorting: false,
            filtering: false,
            display: true,
        },
        {
            header: 'App Id',
            name: 'app_id',
            type: 'string',
            filtering: true,
            sorting: true,
            display: true,
        },
        {
            header: 'App name',
            name: 'app_name',
            type: 'string',
            filtering: true,
            sorting: true,
            display: true,
        },
        {
            header: 'App version',
            name: 'app_version',
            type: 'string',
            filtering: true,
            sorting: true,
            display: true,
        },
        {
            header: 'App domain',
            name: 'app_domain',
            type: 'string',
            filtering: true,
            sorting: true,
            display: true,
        },
        {
            header: 'App URL',
            name: 'app_url',
            type: 'string',
            filtering: false,
            sorting: false,
            display: true,
        },
        {
            header: 'Open',
            name: 'open',
            type: 'string',
            sorting: false,
            filtering: false,
            display: true,
        },
    ],
};
export default columnHeaders;
