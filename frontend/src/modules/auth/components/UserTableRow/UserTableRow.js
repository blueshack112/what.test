//@flow
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import { Button, Checkbox } from '@mui/material';
import { ClearOutlined, Person2Outlined } from '@mui/icons-material';
import TableRow from '@mui/material/TableRow';
import { parseDate } from 'lib/utils';
import type { UserType } from '../../typedefs';
import { useGlobalAction } from 'lib/comms_v2/nonGetActions';
import { makeUserAdminAction, removeUserAdminAction } from 'modules/auth/actionCreators';
import { apiCaller } from 'lib/comms_v2/apiCaller';

type Props = {
  row: UserType,
  rowColor: string,
  defaultAlignCells: string,
  mutateUsers: () => void,
};

const UserTableRow = (props: Props) => {
  const { row, rowColor, defaultAlignCells, mutateUsers } = props;
  const date = parseDate(row.dateJoined);

  const makeAdmin = useGlobalAction(makeUserAdminAction);
  const onMakeAdmin = () => {
    makeAdmin(row.id).then(() => {
      mutateUsers();
    });
  };
  const onRemoveAdmin = () => {
    const removeAdminAction = removeUserAdminAction(row.id);
    apiCaller(removeAdminAction.payload.path, removeAdminAction).then(() => {
      mutateUsers();
    });
  };

  const getMakeRemoveAdminActionButton = (
    label: string,
    StartIcon: *,
    onClick: (*) => void,
    startIconSx: Object = { color: 'white' }
  ) => {
    return (
      <Button
        sx={{
          background: 'rgba(232, 222, 248, 0.08)',
          '&:hover': { backgroundColor: '#37363C' },
        }}
        onClick={onClick}
        variant="contained"
        startIcon={<StartIcon sx={startIconSx} />}
      >
        {label}
      </Button>
    );
  };

  const getRowCell = (element: *, align: string) => {
    return (
      <TableCell align={align ? align : defaultAlignCells} sx={{ color: 'white' }}>
        {element}
      </TableCell>
    );
  };
  return (
    <TableRow
      key={row.id}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        background: rowColor,
      }}
    >
      {getRowCell(<Checkbox sx={{ color: 'white' }} />, 'left')}
      {getRowCell(row.firstName || row.username)}
      {getRowCell(row.groupsDetail.name)}
      {getRowCell(date.toLocaleDateString())}
      {getRowCell(
        row.groupsDetail.name === 'user'
          ? getMakeRemoveAdminActionButton('Make Admin', Person2Outlined, onMakeAdmin)
          : getMakeRemoveAdminActionButton('Remove Admin', ClearOutlined, onRemoveAdmin)
      )}
    </TableRow>
  );
};
export default UserTableRow;
