import { useAuth } from "../../Auth"
import { Layout } from "../../components/Layout"
// import { Button } from "@mui/material"
import { ButtonSer, ButtonType } from "@/components/ButtonSer";
import { useRouter } from 'next/router';
// import { useNavigate } from "react-router-dom"

const InformesDisponibles: () => JSX.Element | null = () => {

  const auth = useAuth()
  const company = auth.user.id_bodega;
  const router = useRouter()
  // const navigate = useNavigate()
  
  const gestion = () =>{ 
    const path = '/GestionDocumentos'; 
    router.push(path);
    auth.setIsMensajero(true)
  }

  const gestionOrdenesCarvajal = () =>{ 
    const path = '/GestionOrdenesCarvajal'; 
    router.push(path);
    auth.setIsMensajero(true)
  }


    return (
  <Layout>
       <div className="container flex flex-col justify-around items-center w-2/3 mt-20 m-6">
       <ButtonSer
       onClick={gestion}
       name="Gestión"
       type={ButtonType.Button}
       fullWidth={true} />
       </div>
       {company === 11 && (
       <div className="container flex flex-col justify-around items-center w-2/3 mt-20 m-6">
        
       <ButtonSer
       onClick={gestionOrdenesCarvajal}
       name="Gestión ordenes Carvajal"
       type={ButtonType.Button}
       fullWidth={true} />
       </div>
       )}
  </Layout>
    )
}

export default InformesDisponibles