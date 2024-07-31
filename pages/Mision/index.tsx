import { Layout } from "../../components/Layout"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

const Mision = () => {
  return (
    <Layout>
      <div
    className="container flex items-center justify-center h-screen md:mt-5 lg:mt-1"
  >
    <Card sx={{ maxWidth: 600, p:1, backgroundColor: green[500]}}>
      <CardMedia
        sx={{ height: 300 }}
        image="https://res.cloudinary.com/combariza/image/upload/v1675258218/Servilla/mision_mf19dw.jpg"
      ></CardMedia>
      <Typography variant='h4' align='center' sx={{p:1}}> Misión </Typography>

      <Typography color="text.primary" sx={{px:5, textAlign: 'justify'}}>
      Servilla SAS es una empresa de logística especializada en empoderar
      a emprendedores, pequeñas y mediana empresas a través de soluciones personalizadas y eficientes.
      Nos comprometemos a ser un socio estratégico, facilitando el crecimiento de nuestros clientes
      y generando un impacto positivo en nuestras comunidades.
      </Typography>
      
    </Card>
  </div>
    </Layout>
  )
}

export default Mision