import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { AppState } from '../../store';
import { IUser } from '../../dtos/IUser';
import Loader from '../../components/loader';
import DataTable, { IHeaderColumn, IRow } from '../../components/dataTable';
import { useAxios } from '../../hooks/useAxios';
import { fetchUsers } from '../../api/user';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'listing-pagination';
import Constants from '../../constants';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import BtnStyles from '../../components/button/index.module.scss';
import i18n from '../../i18n';
import { handleSortTableColumn } from '../../helpers/logic';
import { IsJsonString, highlight } from '../../helpers';
import Paragraph from '../../components/paragraph';
import Input from '../../components/input';
import { AiOutlineSearch } from 'react-icons/ai';

interface IUserTableProps {
  data?: any;
}

function UsersContainer(props: IUserTableProps) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { axios } = useAxios();
  const [headerColumns, setHeaderColumns] = useState<IHeaderColumn[]>([]);
  const [loadedUsers, setLoadedUsers] = useState<any[]>([]);
  const [usersTotalCount, setUsersTotalCount] = useState(0);
  const [displayedRows, setDisplayedRows] = useState<IRow[]>([]);
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? 1);
  const [search, setSearch] = useState(
    searchParams.get(searchParams.get('search') ?? '')
  );

  const headerColumnsBuilder = (
    searchParamsSortBy: { columnName: string; sort: 'asc' | 'desc' }[]
  ): IHeaderColumn[] => {
    let columns: IHeaderColumn[] = [
      {
        name: 'name',
        displayedName: 'Name',
        handleClick(column) {
          setSearchParams(handleSortTableColumn(searchParams, 'name'));
        },
      },
      {
        name: 'birth',
        displayedName: 'Birth',
        handleClick(column) {
          setSearchParams(handleSortTableColumn(searchParams, 'birth'));
        },
      },
      { name: 'position', displayedName: 'Position' },
      { name: 'yearsOfExperience' },
      { name: 'last_login' },
    ];

    searchParamsSortBy.forEach((val, i) => {
      columns = columns.map((column) => {
        return {
          ...column,
          sorted: column.name === val.columnName ? val.sort : column.sorted,
        };
      });
    });
    return columns;
  };

  const rowsBuilder = (users: any[]): IRow[] => {
    return users.map((val, i) => ({
      dataObj: val,
      props: [
        {
          loadContent: (rowValue) => {
            return (
              <Paragraph
                editable={
                  <Input
                    type='text'
                    value={rowValue.name}
                    onChange={(e) => {
                      setLoadedUsers(
                        loadedUsers.map((user, i) => {
                          return user.position == rowValue.position
                            ? { ...user, name: e.target.value }
                            : user;
                        })
                      );
                    }}
                  />
                }
              >
                {rowValue.name}
              </Paragraph>
            );
          },
        },
        {
          loadContent: (rowValue) => {
            return <span>{rowValue.birth}</span>;
          },
          onCellClick: (e: any, rowValue) => {
            alert(rowValue.birth);
          },
        },
        {
          loadContent: (rowValue) => {
            return <span>{rowValue.position}</span>;
          },
          onCellClick: (e: any, rowValue) => {
            alert(rowValue.position);
          },
        },
        {
          loadContent: (rowValue) => {
            return <span>{rowValue.yearsOfExperience}</span>;
          },
          onCellClick: (e: any, rowValue) => {
            alert(rowValue.yearsOfExperience);
          },
        },
        {
          loadContent: (rowValue) => {
            return <span>{rowValue.last_login}</span>;
          },
          onCellClick: (e: any, rowValue) => {
            alert(rowValue.last_login);
          },
        },
      ],
    }));
  };

  useEffect(() => {
    // form stort columns
    const sortBy: any = searchParams.get('sortby');
    const search: any = searchParams.get('search');
    setSearch(search);
    highlight(
      search,
      document.querySelectorAll('table tbody tr td:nth-child(2) span')
    );
    const sortedColumns: any[] = IsJsonString(sortBy) ? JSON.parse(sortBy) : [];
    // api call
    async function loadUsers() {
      const results: any = await fetchUsers(axios)();
      if (!('error' in results)) {
        setLoadedUsers(results.users);
        setUsersTotalCount(results.totalCount);
      } else {
        setLoadedUsers([]);
      }
    }
    loadUsers();
    setHeaderColumns(headerColumnsBuilder(sortedColumns));
  }, [searchParams]);

  useEffect(() => {
    setDisplayedRows(rowsBuilder(loadedUsers));
  }, [loadedUsers]);

  return (
    <>
          <Row className={'m-0 p-0'}>
        <Col sm={3} className={'p-0 mb-3'}>
          <Input
            value={search ?? ''}
            type='text'
            placeholder={i18n.t('global.search').toString()}
            onChange={(e) => {
              searchParams.set('page', '1');
              searchParams.set('search', e.currentTarget.value);
              setSearchParams(searchParams);
            }}
            icon={<AiOutlineSearch />}
          />
        </Col>
      </Row>
    <Loader
      isLoading={false}
      errorMessage={
        displayedRows.length > 0 ? undefined : (
          <p className='font-weight-bold font-italic'>
            Oops! Looks like you havent added any users yet.
          </p>
        )
      }
    >
      <Row className={'m-0 p-0'}>
        <Col sm={12} className={'p-0 text-center'}>
          <DataTable headerColumns={headerColumns} rows={displayedRows} />
        </Col>
        <Col sm={12} className={'mt-3 text-center'}>
          <Pagination
            totalItems={usersTotalCount}
            currentPage={currentPage}
            itemsPerPage={Constants.itemsPerPage}
            displayedNumbersCount={6}
            onChangePage={(pageNumber: number) => {
              searchParams.set('page', pageNumber.toString());
              setSearchParams(searchParams);
            }}
            OnPreBtnClick={(pageNumber: number) => {
              searchParams.set('page', pageNumber.toString());
              setSearchParams(searchParams);
            }}
            OnNextBtnClick={(pageNumber: number) => {
              searchParams.set('page', pageNumber.toString());
              setSearchParams(searchParams);
            }}
            hasNumbersGap
            hasNextPrevious
            previousBtnContent={
              <div className='d-flex font-gull-grey mt-0'>
                <BsArrowLeft
                  size={20}
                  className={'arrow-pagination arrow-icon'}
                />
                <div>{i18n.t('global.pagination.previous')}</div>
              </div>
            }
            nextBtnContent={
              <div className='d-flex font-gull-grey mt-0'>
                <div>{i18n.t('global.pagination.next')}</div>
                <BsArrowRight
                  size={20}
                  className={'arrow-pagination arrow-icon'}
                />
              </div>
            }
            styles={{
              position: 'center',
              numberBtnClass: `px-3 ${BtnStyles['button-light']} mx-1`,
              activeBtnClass: `${'active-button'} mx-1`,
            }}
          />
        </Col>
      </Row>
    </Loader>
    </>
  );
}

export default UsersContainer;
