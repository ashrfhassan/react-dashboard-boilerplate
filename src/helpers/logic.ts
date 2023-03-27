import { IsJsonString } from './index';

export const handleSortTableColumn = (
  searchParams: URLSearchParams,
  Colname: string
) => {
  const sortBy: any = searchParams.get('sortby');
  let sortedColumns: any[] = IsJsonString(sortBy) ? JSON.parse(sortBy) : [];
  const currentColumn = sortedColumns.find((obj) => obj.columnName === Colname);
  if (!currentColumn) {
    searchParams.set(
      'sortby',
      JSON.stringify([...sortedColumns, { columnName: Colname, sort: 'asc' }])
    );
  } else if (currentColumn.sort === 'asc') {
    sortedColumns = sortedColumns.map((obj) =>
      obj.columnName == Colname ? { columnName: Colname, sort: 'desc' } : obj
    );
    searchParams.set('sortby', JSON.stringify(sortedColumns));
  } else {
    sortedColumns = sortedColumns.filter((obj) => obj.columnName !== Colname);
    searchParams.set('sortby', JSON.stringify(sortedColumns));
  }
  return searchParams;
};
