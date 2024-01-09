import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, tableCellClasses, Paper, List, ListItem, ListItemText, Typography } from '@mui/material';
import { PersonPinCircle, CalendarToday, MapsHomeWork, PinDrop, LocationOn, AddLocation, Warning, BorderColor, Error, GppMaybe, GppBad, Lightbulb, AutoFixHigh, Info, Photo, Dangerous } from '@mui/icons-material';

import styled from 'styled-components';
import moment from 'moment/moment';

import CodelcoWhite from './imgs/logo_codelco_white.png';
import GobmWhite from './imgs/logo_gobm_white.png';
import Ejemplo from './imgs/ejemplo.png';

export const TablaReporte = ({dataReporte}) => {

  const { empresa, fecha, lugar, mina,	area,	nivel,	tipo,	calificacion,	quesucedio,	evidencia,	rc,	medidas,	causas,	consecuencias, aprendizaje } = dataReporte.result[0];
  const medida = medidas.split('-|-')
  
  const direvi = evidencia.replace('/var/www/html/web/', '');
  // const direvi = evi.replaceAll('\\', '/');

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3498db',
        color: '#ffffff',
        textAlign:'left',
        border: 0
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        border: 0
    }
  }));

  const StyledTableCellIcon = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3498db',
        color: '#ffffff',
        textAlign:'left',
        border: 0,
        verticalAlign: 'text-top'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        width: '40px',
        border: 0,
        verticalAlign: 'text-top'
    }
  }));

  const StyledTableCellSuperTitle = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3498db',
        color: '#ffffff',
        textAlign:'center',
        fontSize: 28,
        fontWeight: 'bold',
        border: 0
    },
  }));

  const StyledTableCellTitle = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3498db',
        color: '#ffffff',
        textAlign:'left',
        border: 0
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        fontWeight: 'bold',
        border: 0
    }
  }));

  const StyledTableCellContent = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#EBEBEB',
        textAlign:'left',
        verticalAlign: 'text-top'
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#EBEBEB',
        fontSize: 14,
        textAlign: 'left',
        verticalAlign: 'text-top'
    }
  }));

  const StyledTableCellEvidence = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#EBEBEB',
        color: '#ffffff',
        textAlign:'right',
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#EBEBEB',
        fontSize: 14,
        textAlign: 'left',
        width: '40px',
    }
  }));

  const StyledTableRow = styled(TableRow)(() => ({
      '&:nth-of-type(odd)': {
        backgroundColor: '#EBEBEB',
        border: 0
      },
      // hide last border
      '&:last-child td, &:last-child th': {
          border: 0
      }
  }));

  const StyledTable = styled(Table)(() => ({
    paddingRight: '20px',
    borderTop: '15px solid #c0c0c0'
  }));



  const styles = {
    codelcoIcon: {
      height: '60px',
    },
    gobmIcon: {
      height: '125px',
    },
    ejemplo: {
      width: '300px',
      maxWidth: '400px',
    }
  };

  
  return (
    <>
    <TableContainer component={Paper} sx={{ width: 850, border: '5px solid #3498db' }}>

      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <img
                src={CodelcoWhite}
                alt='codelco'
                loading="lazy"
                style={styles.codelcoIcon}
              />
            </StyledTableCell>
            <StyledTableCellSuperTitle>Aprendizaje de incidentes GOM</StyledTableCellSuperTitle>
            <StyledTableCell>
              <img
                src={GobmWhite}
                alt='codelco'
                loading="lazy"
                style={styles.gobmIcon}
              />
            </StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
      
      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><MapsHomeWork /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '33%' }}>Empresa</StyledTableCellTitle>
            <StyledTableCellIcon rowSpan={2}><CalendarToday /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '33%' }}>Fecha y Hora</StyledTableCellTitle>
            <StyledTableCellIcon rowSpan={2}><PersonPinCircle /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '33%' }}>Lugar</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>{empresa}</StyledTableCellContent>
            <StyledTableCellContent>{moment(fecha).format('DD-MM-YYYY HH:mm:ss')}</StyledTableCellContent>
            <StyledTableCellContent>{lugar}</StyledTableCellContent>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><PinDrop /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '33%' }}>Mina</StyledTableCellTitle>
            <StyledTableCellIcon rowSpan={2}><LocationOn /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '33%' }}>Área</StyledTableCellTitle>
            <StyledTableCellIcon rowSpan={2}><AddLocation /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '33%' }}>Nivel</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>{mina}</StyledTableCellContent>
            <StyledTableCellContent>{area}</StyledTableCellContent>
            <StyledTableCellContent>{nivel}</StyledTableCellContent>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><Warning /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '50%' }}>Tipo de incidente</StyledTableCellTitle>
            <StyledTableCellIcon rowSpan={2}><BorderColor /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '50%' }}>Calificación del evento</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>{tipo}</StyledTableCellContent>
            <StyledTableCellContent>{calificacion}</StyledTableCellContent>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><Info /></StyledTableCellIcon>
            <StyledTableCellTitle>¿Qué sucedió?</StyledTableCellTitle>
            <StyledTableCellIcon rowSpan={2}><Photo /></StyledTableCellIcon>
            <StyledTableCellTitle>Evidencia</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>{quesucedio}</StyledTableCellContent>
            <StyledTableCellEvidence>              
              <img
                src={`../${direvi}`}
                alt='evidencia'
                loading="lazy"
                style={styles.ejemplo}
              />
            </StyledTableCellEvidence>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><Dangerous /></StyledTableCellIcon>
            <StyledTableCellTitle>Riesgo crítico</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>{rc}</StyledTableCellContent>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><GppMaybe /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '50%' }}>Causas principales</StyledTableCellTitle>
            <StyledTableCellIcon rowSpan={2}><GppBad /></StyledTableCellIcon>
            <StyledTableCellTitle sx={{ width: '50%' }}>Consecuencias</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>{causas}</StyledTableCellContent>
            <StyledTableCellContent>{consecuencias}</StyledTableCellContent>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><AutoFixHigh /></StyledTableCellIcon>
            <StyledTableCellTitle>Acciones correctivas</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>
              {
                medida.map((meds, index) => (
                  <Typography key={index}>&#8226; {meds}</Typography>
                ))
              }
            </StyledTableCellContent>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <StyledTable size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellIcon rowSpan={2}><Lightbulb /></StyledTableCellIcon>
            <StyledTableCellTitle>Aprendizaje</StyledTableCellTitle>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCellContent>{aprendizaje}</StyledTableCellContent>
          </StyledTableRow>
        </TableBody>
      </StyledTable>

      <Table size="small">
        <TableBody>
          <StyledTableRow>
            <StyledTableCellTitle>&nbsp;</StyledTableCellTitle>
          </StyledTableRow>
        </TableBody>
      </Table>

    </TableContainer>
    </>

  )

}

