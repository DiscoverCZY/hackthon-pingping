import React, { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Loader from 'components/Loader';


export default function BasicTable(props) {
  const { width, height, keyField = 'id', name, columns, data, components, actions } = props;
  const showLoader = useMemo(() => data === null, [data]);
  const [rows, setRows] = useState(data || []);

  useEffect(() => {
    if (data !== null) setRows(data || []);
  }, [data, showLoader])

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: height || '100%',
        width,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        
      }}
    >
      <Table sx={{ minWidth: 200 }} aria-label={`${name}-head`}>
        <TableHead>
          <TableRow>
            {columns.map(({ field, label, render, ...col }) => (
              <TableCell
                key={field}
                variant="head"
                {...col}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </Table>
      <Box sx={{ display: 'flex', maxHeight: '100%', overflow: `${showLoader ? 'hidden' : 'auto'}`, position: 'relative' }}>
        <Loader show={showLoader} bg />
        <Table sx={{ minWidth: 200, }} aria-label={`${name}-body`}>
          <TableBody>
            {
              !rows.length ?
                <TableRow
                  key={"cont"}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{showLoader ? 'loading' : 'No data'}</TableCell>
                </TableRow> :
                rows.map((row, index) => (
                  <TableRow
                    key={`${row[keyField]}-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    hover
                  >
                    {
                      columns.map((col) => {
                        const { field, align, width, render } = col;
                        const value = row[field];
                        if (render) {
                          const Comp = components[render];
                          return (
                            <TableCell
                              key={`${index}-${field}`}
                              align={align}
                              width={width}
                            >
                              <Comp column={col} value={value} row={row} id={row[keyField]} actions={actions} />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            key={field}
                            align={align}
                            width={width}
                          >
                            {value}
                          </TableCell>
                        );
                      })
                    }
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}