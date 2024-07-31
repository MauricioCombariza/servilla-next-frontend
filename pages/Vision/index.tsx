import { Layout } from "../../components/Layout"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

const Vision = () => {
  return (
    <Layout>
      <div
    className="container flex items-center justify-center h-screen mt-5 lg:mt-1"
  >
    <Card sx={{ maxWidth: 600, p:1, backgroundColor: green[500]}}>
      <CardMedia
        sx={{ height: 300 }}
        image="https://res.cloudinary.com/combariza/image/upload/v1675258218/Servilla/vision_vqyyd1.jpg"
      ></CardMedia>
      <Typography variant='h4' align='center' sx={{p:1}}> Visión </Typography>

      <Typography color="text.primary" sx={{px:5, textAlign: 'justify'}}>
      Ser reconocidos como líderes en la industria logística,
      ofreciendo soluciones innovadoras que superen las expectativas de nuestros clientes.
      Aspiramos a ser el aliado estratégico de elección para emprendedores, pequeñas y mediana empresas en Colombia,
      contribuyendo al desarrollo económico y social del país.
      </Typography>
      
    </Card>
  </div>
    </Layout>
  )
}

export default Vision