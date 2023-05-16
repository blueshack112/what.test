//@flow
import { Box, Typography } from '@mui/material';
import React from 'react';
import { colorPalette } from 'lib/constants';

type Props = {
  label: string,
  onClick: () => void,
  selected: boolean,
};
const NavbarButton = (props: Props) => {
  const { onClick, label, selected } = props;

  return (
    <Box
      sx={{
        background: selected ? colorPalette.lightPink : colorPalette.lightBlue,
        color: colorPalette.darkBlue,
        borderRadius: 1,
        padding: 1,
        marginX: 0.5,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Typography sx={{ alignSelf: 'center' }}>{label}</Typography>
    </Box>
  );
};

export default NavbarButton;
