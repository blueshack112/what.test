import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { AccountBox } from '@mui/icons-material';

export const LogoHalf = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      flexDirection={'column'}
      alignItems={'center'}
      height={'100vh'}
    >
      <Box>
        <List>
          <ListItem>
            <ListItemIcon>
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1018_6210)">
                  <path
                    d="M45.5 26C45.5 15.2344 36.7656 6.5 26 6.5V45.5C36.7656 45.5 45.5 36.7656 45.5 26ZM52 26C52 40.3609 40.3609 52 26 52C11.6391 52 0 40.3609 0 26C0 11.6391 11.6391 0 26 0C40.3609 0 52 11.6391 52 26Z"
                    fill="url(#paint0_linear_1018_6210)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_1018_6210"
                    x1="26"
                    y1="0"
                    x2="26"
                    y2="52"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.0001" stopColor="white" />
                  </linearGradient>
                  <clipPath id="clip0_1018_6210">
                    <rect width="52" height="52" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </ListItemIcon>
            <ListItemText
              color="red"
              primary="Mal X"
              primaryTypographyProps={{
                margin: '10px',
                lineHeight: '25px',
                fontWeight: '800',
                color: 'white',
                fontSize: '21px',
              }}
            />
          </ListItem>
        </List>
      </Box>
      <Box>
        <svg
          width="198"
          height="198"
          viewBox="0 0 198 198"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="1" width="196" height="196" rx="7" fill="white" />
          <path
            d="M39.6 158.4L158.4 39.6M158.4 158.4L39.6 39.6"
            stroke="black"
            strokeWidth="4.95"
            strokeLinecap="round"
          />
          <rect x="1" y="1" width="196" height="196" rx="7" stroke="black" strokeWidth="2" />
        </svg>
      </Box>
      <AccountBox />
      <Box></Box>
    </Box>
  );
};
