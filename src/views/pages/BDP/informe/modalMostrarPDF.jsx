import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import {
  Document, Image, Page,
  PDFViewer, StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';

import { memo, useEffect, useState, useRef } from 'react';



import codelco from '../../../../images/logos/0.png';
import C4600016485 from '../../../../images/logos/4600016485.png';
import C4600018738 from '../../../../images/logos/4600018738.png';
import C4600020557 from '../../../../images/logos/4600020557.png';
import C4600021050 from '../../../../images/logos/4600021050.png';
import C4600021555 from '../../../../images/logos/4600021555.png';
import C4600021851 from '../../../../images/logos/4600021851.png';
import C4600022046 from '../../../../images/logos/4600022046.png';
import C4600022227 from '../../../../images/logos/4600022227.png';
import C4600024486 from '../../../../images/logos/4600024486.png';
import C4600024495 from '../../../../images/logos/4600024495.png';
import C4800000781 from '../../../../images/logos/4800000781.png';

import C61704000K from '../../../../images/logos/61.704.000-K.png';
import C760418714 from '../../../../images/logos/76.041.871-4.png';
import C761052063 from '../../../../images/logos/76.105.206-3.png';
import C766431380 from '../../../../images/logos/76.643.138-0.png';
import C770146658 from '../../../../images/logos/77.014.665-8.png';
import C772036507 from '../../../../images/logos/77.203.650-7.png';
import C778428407 from '../../../../images/logos/77.842.840-7.png';
import C781193208 from '../../../../images/logos/78.119.320-8.png';
import C781944203 from '../../../../images/logos/78.194.420-3.png';
import C783185709 from '../../../../images/logos/78.318.570-9.png';
import C795383506 from '../../../../images/logos/79.538.350-6.png';
import C879964008 from '../../../../images/logos/87.996.400-8.png';
import C892284008 from '../../../../images/logos/89.228.400-8.png';
import C954670007 from '../../../../images/logos/95.467.000-7.png';
import C96557400K from '../../../../images/logos/96.557.400-K.png';
import C966192704 from '../../../../images/logos/96.619.270-4.png';
import C967688002 from '../../../../images/logos/96.768.800-2.png';
import C995618907 from '../../../../images/logos/99.561.890-7.png';
import C999999999 from '../../../../images/logos/99.999.999-9.png';




const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: '10px',
   
  },
  section: {
    backgroundColor: '#5091cc',
    height: '100',
    display: 'flex',
    flexDirection: 'row',
  },
  containerImage: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '35',
  },
  image1: {
    width: '170px',
    height: '60px',
    margin: '2px',
  },
  image2: {
    width: '170px',
    height: '60px',
    margin: '10px',
    padding: '10px',
  },
});

const ModalMostrarPDF = ({ abrirModal, setAbrirModal, id, contrato, empresa }) => {
  const [isImagesReady, setIsImagesReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(codelco);
  const isMounted = useRef(true); // Variable de referencia para verificar si el componente está montado


  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = {  // objeto para buscar la imagen importada con el numero de ctto
          '4600016485': C4600016485,
          '4600018738': C4600018738,
          '4600020557': C4600020557,
          '4600021050': C4600021050,
          '4600021555': C4600021555,
          '4600021851': C4600021851,
          '4600022046': C4600022046,
          '4600022227': C4600022227,
          '4600024486': C4600024486,
          '4600024495': C4600024495,
          '4800000781': C4800000781,
          '61.704.000-K': C61704000K,
          '77.842.840-7': C778428407,
          '89.228.400-8': C892284008,
          '99.999.999-9': C999999999,
          '76.041.871-4': C760418714,
          '78.119.320-8': C781193208,
          '95.467.000-7': C954670007,
          '76.105.206-3': C761052063,
          '78.194.420-3': C781944203,
          '96.557.400-K': C96557400K,
          '76.643.138-0': C766431380,
          '78.318.570-9': C783185709,
          '96.619.270-4': C966192704,
          '77.014.665-8': C770146658,
          '79.538.350-6': C795383506,
          '96.768.800-2': C967688002,
          '77.203.650-7': C772036507,
          '87.996.400-8': C879964008,
          '99.561.890-7': C995618907,
         


         
        };

        if (images[contrato]) {
          setSelectedImage(images[contrato]);
        }else if (images[empresa]) {
          setSelectedImage(images[empresa]);
        }

        const imagePromises = Object.values(images).map((img) => new Promise((resolve) => {  // Se crea una promesa para cada imagen en el objeto "images"
            const imageObj = new window.Image();  // Se crea un nuevo objeto Image de JavaScript
            imageObj.src = img;  // Se establece la fuente (src) de la imagen en la URL de la imagen
            imageObj.onload = () => { // Se configura un manejador de evento que se ejecuta cuando la imagen se carga completamente
            //  resolve(); // Una vez que la imagen se ha cargado, resolvemos la promesaa
          // Verificar si el componente está montado antes de actualizar el estado
          if (isMounted.current) {
            resolve();
          }  
          
          };

   
            

          }));

        await Promise.all(imagePromises);

       // setIsImagesReady(true);

       // Verificar si el componente está montado antes de actualizar el estado
       if (isMounted.current) {
        setIsImagesReady(true);
      }

      } catch (error) {
        console.error('Error al cargar imágenes:(', error);
      }
    };

    loadImages();

    // Función de limpieza para desmontar el componente
    return () => {
      isMounted.current = false; // Marcar el componente como desmontado
    };
  }, [contrato, empresa]);

  return (
    <>
      <Dialog open={abrirModal} maxWidth="xL" fullWidth>
        <DialogTitle id="customized-dialog-title">
          PDF - identificador ctto n° {contrato}
        </DialogTitle>
        {isImagesReady && (
          <DialogContent dividers>
            <PDFViewer width="1500" height="1500">
              <Document title="GOM">
                <Page size="A4" style={styles.page} orientation="landscape">
                  <View style={styles.section}>
                    <View style={styles.containerImage}>
                      <Image src={codelco} fixed style={styles.image1} />
                    </View>
                    <View style={styles.containerText}>
                      <Text style={styles.title}>{id}</Text>
                    </View>
                    <View style={styles.containerImage}>
                      <Image src={selectedImage} fixed style={styles.image2} />
                    </View>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </DialogContent>
        )}

        <DialogActions>
          <Button
            color="error"
            variant="contained"
            style={{ textTransform: 'none' }}
            autoFocus
            onClick={() => setAbrirModal(false)}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default memo(ModalMostrarPDF);
