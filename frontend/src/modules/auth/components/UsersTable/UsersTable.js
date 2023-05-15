//@flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, Divider, TableSortLabel } from '@mui/material';
import { useGlobalSWR } from 'lib/comms_v2/useGlobalSWR';
import * as actionCreators from 'modules/auth/actionCreators';
import UserTableRow from '../UserTableRow';
import type { UsersSWREntity } from '../../typedefs';
import LoadingOrErrorWrapper from 'modules/app/components/LoadingOrErrorWrapper';
import { getComparator, stableSort } from 'lib/utils';

// TODO: Custom sorting mapping
export default function UsersTable() {
  const getAllUsersAction = actionCreators.compileListUsersAction();
  const usersEntity: UsersSWREntity = useGlobalSWR(getAllUsersAction);
  const defaultAlignCells = 'center';
  const defaultColumnWidth = `${92 / 4}%`;

  const [dataArrangement, setDataArrangement] = useState({
    data: usersEntity.data ? usersEntity.data : [],
    sortByColumn: 'users',
    sortDirection: 'asc',
  });

  // Update data if entity reloads
  useEffect(() => {
    usersEntity.data &&
      (!dataArrangement.data || usersEntity.data.length !== dataArrangement.data.length) &&
      setDataArrangement({
        ...dataArrangement,
        data: usersEntity.data,
      });
  }, [dataArrangement, usersEntity.data]);

  const sortedData = () => {
    return stableSort(
      dataArrangement.data,
      getComparator(dataArrangement.sortDirection, dataArrangement.sortByColumn)
    );
  };
  const onRequestSort = (event, columnId) => {
    const isAsc =
      dataArrangement.sortByColumn === columnId && dataArrangement.sortDirection === 'asc';
    setDataArrangement({
      ...dataArrangement,
      sortDirection: isAsc ? 'desc' : 'asc',
      sortByColumn: columnId,
    });
  };
  const createSortHandler = (columnId) => (event) => {
    onRequestSort(event, columnId);
  };

  type GetHeaderCellArgs = {
    element: *,
    cellId?: string,
    sortable?: boolean,
    align?: string,
    isCheckbox?: boolean,
  };
  const getHeaderCell = (args: GetHeaderCellArgs) => {
    const sortableProps =
      args.sortable && args.cellId
        ? {
            id: args.cellId,
            sortDirection:
              dataArrangement.sortByColumn === args.cellId ? dataArrangement.sortDirection : false,
          }
        : {};

    return (
      <TableCell
        {...sortableProps}
        width={args.isCheckbox ? '8%' : defaultColumnWidth}
        align={args.align ? args.align : defaultAlignCells}
        sx={{ background: '#191919', border: 0, paddingY: 0, color: 'white', fontWeight: 600 }}
      >
        {args.sortable ? (
          <TableSortLabel
            active={dataArrangement.sortByColumn === args.cellId}
            direction={
              dataArrangement.sortByColumn === args.cellId ? dataArrangement.sortDirection : 'asc'
            }
            onClick={createSortHandler(args.cellId)}
            sx={{
              color: 'white',
              fontWeight: 600,
              '&:hover': { color: 'white' },
              '&.Mui-active': { color: 'white' },
              '&.Mui-active .MuiTableSortLabel-icon': { color: 'white', fontWeight: 800 },
            }}
          >
            {args.element}
            {dataArrangement.sortByColumn === args.cellId ? (
              <Box component="span" sx={visuallyHidden}>
                {dataArrangement.sortDirection === 'desc'
                  ? 'sorted descending'
                  : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        ) : (
          args.element
        )}
      </TableCell>
    );
  };

  const tableColors = ['#191919', '#37363C'];
  return (
    <TableContainer component={Paper} sx={{ background: 'black', height: 630 }}>
      <LoadingOrErrorWrapper swrEntity={usersEntity}>
        <Table aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow sx={{ background: '#191919' }}>
              {getHeaderCell({
                element: <Checkbox sx={{ color: 'white' }} />,
                isCheckbox: true,
                sortable: false,
              })}
              {getHeaderCell({ element: 'Users', cellId: 'firstName', sortable: true })}
              {getHeaderCell({ element: 'Role', cellId: 'role', sortable: false })}
              {getHeaderCell({ element: 'Joined At', cellId: 'joined', sortable: false })}
              {getHeaderCell({ element: 'Actions', sortable: false })}
            </TableRow>
            <TableRow>
              <TableCell sx={{ display: 'contents' }}>
                <Divider sx={{ height: '20px' }} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArrangement.data &&
              sortedData().map((row, index) => {
                return (
                  <UserTableRow
                    key={row.id}
                    row={row}
                    rowColor={index % 2 === 1 ? tableColors[0] : tableColors[1]}
                    defaultAlignCells={defaultAlignCells}
                    mutateUsers={usersEntity.mutate}
                  />
                );
              })}
          </TableBody>
        </Table>
      </LoadingOrErrorWrapper>
    </TableContainer>
  );
}
