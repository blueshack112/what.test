//@flow
import { Button } from '@mui/material';
import React from 'react';
import { buttonStyle, unselectedButtonStyle } from './styles';

type Props = {
  label: string,
  Icon: $ElementType,
  onClick: () => void,
  selected: boolean,
};
const SidebarButton = (props: Props) => {
  const { onClick, Icon, label, selected } = props;

  return (
    <Button
      variant="contained"
      startIcon={<Icon />}
      style={selected ? buttonStyle : unselectedButtonStyle}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default SidebarButton;
