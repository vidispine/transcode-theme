import React from 'react';

import {
  withStyles,
  List,
  Paper,
  ListItem,
  IconButton,
  Avatar,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
} from '@material-ui/core';
import { Check as CheckIcon, Error as ErrorIcon, Close as CloseIcon } from '@material-ui/icons';
import { SnackbarContent, useSnackbar } from 'notistack';

const styles = () => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Snackbar = React.forwardRef(({ response, classes }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const title = React.useMemo(() => {
    if (response.some(({ error }) => error)) return 'Some jobs failed';
    return 'All jobs started successfully';
  }, [response]);

  return (
    <SnackbarContent ref={ref}>
      <Paper>
        <List
          subheader={
            <ListSubheader className={classes.header}>
              {title}
              <IconButton onClick={() => closeSnackbar()} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </ListSubheader>
          }
        >
          {response.map(({ tag, error }) => (
            <ListItem key={tag}>
              <ListItemAvatar>
                <Avatar>
                  {error && <ErrorIcon color="error" fontSize="small" />}
                  {!error && <CheckIcon color="action" fontSize="small" />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                secondaryTypographyProps={{ color: 'error' }}
                primary={tag}
                secondary={error}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </SnackbarContent>
  );
});

export default withStyles(styles)(Snackbar);
