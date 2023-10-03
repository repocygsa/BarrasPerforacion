import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as XLSX from 'xlsx';
import moment from 'moment';

export const CrearExcelListaSolicitudes = ({data}) => {

  const newExcel =()=>{

    const ndata = [];

    data.data.map((row) => (
      ndata.push({
        'Rut':row.rut_solicitante,
        'Nombre': row.nomsolicita,
        'Fecha hora solicitud': row.fec_solicitud ? moment(row.fec_solicitud).format('YYYY-MM-DD HH:mm') : '',
        'Correo': row.cor_solicitante,
        'Teléfono': row.fon_solicitante,
        'Observaciones': row.obs,
      })
    ));

    const wb = XLSX.utils.book_new();
    const hoja1 = XLSX.utils.json_to_sheet(ndata);

    hoja1.s = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FF1c4587'},
      bgColor:{argb:'FF1c4587'}
    };

    XLSX.utils.book_append_sheet(wb,hoja1,"solicitud_epp")          
    XLSX.writeFile(wb,`solicitud_epp_${moment.parseZone().format('DD-MM-YYYY_HH-mm')}.xlsx`)

  }

  return (
    <>
    <Tooltip title="Generar archivo excel">
      <Button variant='contained' fullWidth style={{backgroundColor:'#084A08'}} onClick={()=>newExcel()}>Excel</Button>
    </Tooltip>
    </>
  )

}
