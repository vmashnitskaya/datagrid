interface BaseColumn<T> {
    type: T;
    name: string;
    header: string;
    sorting: boolean;
    filtering: boolean;
}

interface StringColumn extends BaseColumn<'string'> {
    maxLength?: number;
}

interface SelectColumn extends BaseColumn<'select'> {
    options: Array<string>;
}

export type ColumnInterface = StringColumn | SelectColumn;
