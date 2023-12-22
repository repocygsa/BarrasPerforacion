import { Button, Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';

  export const UploadComponentBloqueo = (props) => {

    const { setFieldValue} = props;
   
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop: acceptedFiles => {
        setFieldValue("fil_blo", acceptedFiles);
      },
      multiple: false,
      noClick: true,
      noKeyboard: true,
      accept: {
        'image/jpeg': [],
        'image/png': []
      }
    });

    return (
      
      <Grid item xs={12} md={12} lg={12} mb={3}>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {
          isDragActive ? (
            <p>Cargar archivos</p>
          ):(
          <Button size="small" variant="contained" color="secondary" onClick={open} >
            <AttachFileIcon/>
          </Button>
          )}
        </div>
      </Grid>
      
    );
  }
  