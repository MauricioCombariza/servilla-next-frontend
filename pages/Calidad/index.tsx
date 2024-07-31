import { Layout } from "../../components/Layout"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

const Calidad = () => {
  return (
    <Layout>
      <div
    className="container flex items-center justify-center h-screen md:mt-5 lg:mt-1"
  >
    <Card sx={{ maxWidth: 600, p:1, backgroundColor: green[500]}}>
      <CardMedia
        sx={{ height: 300 }}
        image="https://res.cloudinary.com/combariza/image/upload/v1675258218/Servilla/calidad_sfwsnf.jpg"
      ></CardMedia>
      <Typography variant='h4' align='center' sx={{p:1}}> Calidad </Typography>

      <Typography color="text.primary" sx={{px:5, textAlign: 'justify'}}>
      En Servilla SAS, somos apasionados por empoderar a los emprendedores y generar un impacto positivo en nuestras comunidades.
      A través de soluciones logísticas personalizadas y eficientes,
      nos comprometemos a superar las expectativas de nuestros clientes, fomentando su crecimiento y desarrollo.
      Nuestra cultura se basa en la innovación continua y la mejora constante de nuestros procesos,
      asegurando siempre un servicio de alta calidad.
      </Typography>
      
    </Card>
  </div>
    </Layout>
  )
}

export default Calidad