import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useCallback } from 'react';
type AccountPopoverProps = {
  anchorEl: any;
  onClose: () => void;
  open: boolean;
};

export const AccountPopover = (props: AccountPopoverProps) => {
  const { anchorEl, onClose, open } = props;

  const handleSignOut = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant='overline'>Account</Typography>
        <Typography color='text.secondary' variant='body2'>
          Anika Visser
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
