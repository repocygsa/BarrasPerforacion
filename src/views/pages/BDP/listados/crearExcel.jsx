import { Button, Grid } from '@mui/material';
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import moment from 'moment';
import { Box } from '@mui/system';


export const CrearExcel = ({data, tipo}) => {
// dataRegistroInfraElectrica.data.result

// console.log(data, 'excel')
  const newExcel =()=>{

    const ndata = [];

    

      data.map((row) => (
        ndata.push({
          'Código identificador':row.bdp_cod_identificador,
          'Empresa': row.nom_empre,
          'Contrato': row.fk_ctto,
          'Tipo de acero': row.bdp_tipo_acero,
          'Marca': row.bdp_marca,
          'Usuario': row.Nombre,
          'Fecha de creación': moment(row.bdp_fecha_hora).format('DD-MM-YYYY HH:mm'),
          'Causal del retiro': row.bdp_causal,
          'Observación del retiro': row.bdp_obs,
          'Responsable del retiro':row.nom_resp,
          'Fecha de retiro': row.bdp_fec_hora_ret?moment(row.bdp_fec_hora_ret).format('DD-MM-YYYY HH:mm'):'',
         
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

    XLSX.utils.book_append_sheet(wb,hoja1,"gestion_Barras_Perforacion")          
    XLSX.writeFile(wb,`gestion_BDP${moment.parseZone().format('DD-MM-YYYY_HH-mm')}.xlsx`)

  }

  return (
    <>
    <Grid container spacing={1} rowSpacing={1} mt={1} >
      <Button variant='contained' fullWidth style={{backgroundColor:'#084A08'}} startIcon={<FileDownloadIcon/>} onClick={()=>newExcel()}> Excel</Button>
    </Grid>
    </>
  )

}
