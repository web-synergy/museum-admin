import { FC } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { IEvent } from '@/types/events';

import TableItemActivity from './TableItemActivity';
import { EventStatus } from '@/assets/constants/formEnums';

interface EventTableProps {
  events: IEvent[];
  onDeleteEvent: (id: string) => void;
}

const EventTable: FC<EventTableProps> = ({ events, onDeleteEvent }) => {
  return (
    <TableContainer component="div">
      <Table aria-label="events list">
        <TableHead
          sx={{ backgroundColor: (theme) => theme.palette.gray.light }}
        >
          <TableRow>
            <TableCell sx={{ width: { xs: 102, md: 122 } }} scope="col">
              Дата
            </TableCell>
            <TableCell scope="col">Назва події</TableCell>
            <TableCell
              align="right"
              sx={{ width: { xs: 32, md: 104, lg: 120 } }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.length > 0 &&
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell sx={{ fontWeight: 400 }}>
                  {DateTime.fromISO(event.created).toLocaleString()}
                </TableCell>
                <TableCell>
                  {event.title}
                  {event.status === EventStatus.DRAFT && (
                    <Typography
                      component="span"
                      ml={1}
                      color="error"
                      fontWeight={500}
                    >
                      (чернетка)
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <TableItemActivity
                    id={event.id}
                    title={event.title}
                    onDeleteEventState={onDeleteEvent}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
