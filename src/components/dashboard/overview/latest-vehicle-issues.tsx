import React from 'react';
import { Error } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

export interface Issue {
  numberplate: string;
  issue: string;
  updatedAt: Date;
}

export interface LatestVehicleIssuesProps {
  issues?: Issue[];
  sx?: SxProps;
}

export function LatestVehicleIssues({ issues = [], sx }: LatestVehicleIssuesProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest Issues" />
      <Divider />
      <List>
        {issues.map(({ numberplate, issue, updatedAt }, index) => (
          <ListItem divider={index < issues.length - 1} key={numberplate}>
            <ListItemAvatar>
              <Error fontSize="large" color="error" />
            </ListItemAvatar>
            <ListItemText
              primary={issue}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              secondary={`Updated ${dayjs(updatedAt).format('MMM D, YYYY')}`}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
            <Button color="error" size="small" variant="contained">
              Resolve
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
