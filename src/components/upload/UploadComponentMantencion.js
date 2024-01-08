import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button, Grid } from "@mui/material";
import { useDropzone } from "react-dropzone";

  export const UploadComponentMantencion = (props) => {

    const { setFieldValue} = props;
   
    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop: acceptedFiles => {
        setFieldValue("fil_tab", acceptedFiles);
      },
      multiple: true,
      noClick: true,
      noKeyboard: true,
    /*  accept: {
        'image/jpeg': [],
        'image/png': [],
        'application/pdf':['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/vnd.ms-excel': ['.xls', '.xlsx'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
      } */
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
  