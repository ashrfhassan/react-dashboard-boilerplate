import styles from './index.module.scss';
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { BiSortDown, BiSortUp } from 'react-icons/bi';

export interface IHeaderColumn {
  name: string;
  displayedName?: React.ReactNode;
  sorted?: 'asc' | 'desc';
  handleClick?: (column: IHeaderColumn) => void;
}

export interface IProp {
  className?: string;
  loadContent: (rowValue: any) => React.ReactNode;
  onCellClick?: (
    e: React.MouseEvent<HTMLElement>,
    rowValue: IRow['dataObj']
  ) => void;
}

export interface IRow {
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    rowValue: IRow['dataObj']
  ) => void;
  dataObj: any;
  props: IProp[];
}

export type DataTableProps = {
  className?: string;
  headerColumns: IHeaderColumn[];
  rows: IRow[];
};

const DataTable = React.forwardRef(
  (
    { className, headerColumns, rows }: DataTableProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => (
    <Container fluid className={`p-0 ${className ?? ''}`}>
      <Row
        className={`justify-content-center ${styles['scoll-row-horizontal']}`}
      >
        <Col className={'text-center'}>
          <table className={styles['table']}>
            <thead>
              <tr className={styles['table-head']}>
                {headerColumns.map((column, i) => (
                  <th
                    key={i}
                    className={`${column.handleClick ? styles['pointer'] : ''}`}
                    onClick={() => {
                      column.handleClick?.(column);
                    }}
                  >
                    <div className='d-flex justify-content-center align-items-center'>
                      {column.displayedName ?? column.name}
                      {column.handleClick &&
                        column.sorted &&
                        (column.sorted == 'desc' ? (
                          <BiSortDown />
                        ) : (
                          <BiSortUp />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles['tbody']}>
              {rows.map((row, i) => (
                <tr key={i} className='pointer'>
                  {row.props.map((prop, i) => {
                    return (
                      <td
                        key={i}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          e.stopPropagation();
                          if (prop.onCellClick)
                            prop.onCellClick(e, row.dataObj);
                          else if (row.onClick) {
                            row.onClick(e, row.dataObj);
                          }
                        }}
                      >
                        {prop.loadContent(row.dataObj)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  )
);

DataTable.displayName = 'DataTable';
export default DataTable;
