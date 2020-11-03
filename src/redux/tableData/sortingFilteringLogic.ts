import { RenderDataObject } from './tableDataInterface';

const sortArray = (
    array: RenderDataObject[],
    sortingColumn: string,
    sorting: string
): RenderDataObject[] => {
    return array.sort((a, b) => {
        if (a[sortingColumn] < b[sortingColumn]) {
            return sorting === 'up' ? -1 : 1;
        }
        if (a[sortingColumn] > b[sortingColumn]) {
            return sorting === 'up' ? 1 : -1;
        }
        return 0;
    });
};

const filterStringsAndNumbers = (
    column: string,
    query: string,
    array: { [key: string]: any }[]
): { [key: string]: any }[] => {
    return array.filter((element) => {
        if (typeof element[column] === 'string') {
            return element[column].toLowerCase().startsWith(query.toLowerCase());
        }
        if (typeof element[column] === 'number') {
            return element[column] === Number(query);
        }
        return false;
    });
};

export default { sortArray, filterStringsAndNumbers };
