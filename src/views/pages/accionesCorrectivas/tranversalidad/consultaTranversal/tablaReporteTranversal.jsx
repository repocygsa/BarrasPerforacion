import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import moment from 'moment';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

export const TablaReporteTranversal = ({ rows,estado }) => {


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
 
        },
      }));


  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={130}>Fecha de cierre</StyledTableCell>
            <StyledTableCell width={160}>{estado==='2'?'Dias fuera de plazo':'Dias restantes'}</StyledTableCell>
            <StyledTableCell>Empresa</StyledTableCell>
            <StyledTableCell>Contrato</StyledTableCell>
            <StyledTableCell>Jerarquía</StyledTableCell>
            <StyledTableCell>Acción correctiva</StyledTableCell>
            <StyledTableCell>Responsable</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{moment(row.inc_det_fecha_cierre).format('DD-MM-YYYY')}</TableCell>
              <TableCell>{Math.abs(row.dias_diferencia)}</TableCell>
              <TableCell>{row.nom_empre ? row.nom_empre : row.nomEmpreCab}</TableCell>
              <TableCell>{row.fk_ctto ? row.fk_ctto : row.cttoCab}</TableCell>
              <TableCell>{row.jerarquia}</TableCell>
              <TableCell>
            {row.inc_med_correctiva}
              </TableCell>
              <TableCell>{row.Nombre}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaReporteTranversal;
