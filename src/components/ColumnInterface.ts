export interface ColumnInterface {
    name: string;
    header: string;
}

export interface ColumnsInterface {
    Users: ColumnInterface[];
    Apps: ColumnInterface[];
    Locations: ColumnInterface[];
}
