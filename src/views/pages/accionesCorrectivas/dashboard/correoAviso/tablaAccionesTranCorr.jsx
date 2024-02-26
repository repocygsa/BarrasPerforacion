import React, { memo, useState } from 'react';
import { Box, CircularProgress, Grid, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

export const TablaAccionesTranCorr = ({ dataRegistroStock, setSnackMensaje, usuario, ctto, empre }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [maxCharacters, setMaxCharacters] = useState(40);

  const handleVerMasClick = () => {
    setShowFullContent(!showFullContent);
  };


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const CustomMedCorrCell = ({ medCorrectiva }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        {expanded ? medCorrectiva : medCorrectiva.slice(0, 80)}&nbsp;
        {medCorrectiva.length > 80 && (
          <Link
            type="button"
            component="button"
            sx={{ fontSize: 'inherit' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </Link>
        )}
      </div>
    );
  };

  const CustomEstatusCell2 = ({ estatus, est, com }) => {
    let textColor = 'black';

    if (est) {
      if (est === 3) {
        textColor = 'red';
        estatus = 'No Aplica';
      } else if (est === 1) {
        textColor = 'blue';
        estatus = 'Sin complementar';
      } else if (est === 2) {
        textColor = 'green';
        estatus = 'Complementado';
        if (com === 3) {
          textColor = 'green';
          estatus = 'Complementado';
        }
      } else if (com === 4) {
        textColor = 'red';
        estatus = 'Eliminado';
      }
    } else {
      textColor = 'blue';
      estatus = 'Sin complementar';
    }

    return (
      <Typography style={{ color: textColor }}>
        {estatus}
      </Typography>
    );
  };

  const CustomEstatusCell = ({ estatus, porcentaje }) => (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={30} variant="determinate" value={porcentaje} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
      >
        <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(porcentaje)}%`}</Typography>
      </Box>
    </Box>
  );

  const columnasDatosStock = [
   
    {
      field: 'emp',
      headerName: 'Empresa',
      align: 'left',
      minWidth: 200,
      renderCell: (params) => params.row.nom_empre,
    },
    {
      field: 'ctto',
      headerName: 'Contrato',
      align: 'left',
      minWidth: 150,
      renderCell: (params) => params.row.fk_cst_ctto,
    },

    {
      field: 'med',
      headerName: 'Sin complementar',
      align: 'left',
      minWidth: 150,
      renderCell: (params) => params.row.medidas_sc,
    },
    {
      field: 'cct',
      headerName: 'CCT a cargo',
      align: 'left',
      minWidth: 300,
      renderCell: (params) => params.row.cct_nom,
    },
   
  ];


  const columnasDatosStockDetallado = [
    {
      field: 'fcrea',
      headerName: 'Fecha de creación',
      align: 'left',
      minWidth: 150,
      renderCell: (params) => moment(params.row.inc_fecha_hora_registro).format('DD-MM-YYYY'),
    },
    {
      field: 'emp',
      headerName: 'Empresa',
      align: 'left',
      minWidth: 200,
      renderCell: (params) => params.row.nom_empre,
    },
    {
      field: 'ctto',
      headerName: 'Contrato',
      align: 'left',
      minWidth: 200,
      renderCell: (params) => params.row.ctto_cab,
    },
    {
      field: 'jer',
      headerName: 'Jerarquía',
      align: 'left',
      minWidth: 150,
      renderCell: (params) => params.row.nom,
    },
    {
      field: 'acc',
      headerName: 'Acción correctiva',
      align: 'left',
      minWidth: 300,
      renderCell: (params) => params.row.inc_med_correctiva,
    },
    {
      field: 'nom',
      headerName: 'Responsable',
      align: 'left',
      minWidth: 300,
      renderCell: (params) => params.row.Nombre,
    },
  ];

  return (
    <Grid container spacing={1} mt={1} rowSpacing={1}>
      <Grid item md={12} xs={12}>
        {dataRegistroStock.length === 0 ? (
          <Typography variant="h4" color="primary">
            No se encontraron datos
          </Typography>
        ) : (
          <TableContainer  component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  {columnasDatosStock.map((columna) => (
                    <StyledTableCell key={columna.field}>{columna.headerName}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataRegistroStock.map((fila) => (
                  <TableRow key={fila.id}>
                    {columnasDatosStock.map((columna) => (
                      <TableCell key={columna.field}>{columna.renderCell ? columna.renderCell({ row: fila }) : fila[columna.field]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(TablaAccionesTranCorr);
