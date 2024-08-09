import React from "react";
import { ButtonSer, ButtonType } from "../../components/ButtonSer";
import Container from '@mui/material/Container';
import { useAuth } from "../../Auth";
import { AuthContextProps } from "../../Auth";
import { LoginType } from "../../Hooks/usePostLogin";
import { LOADING_STATUS } from "../../Hooks/usePostLogin";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { supabase } from "@/supabase";

interface FormData {
    auth: AuthContextProps
    userId: string
  }
  

const Ingresar = () => {
    // const auth = useAuth() as AuthContextProps
    const { login } = useAuth();

    const form = React.useRef<HTMLFormElement>(null)
    
    // const OnFormSubmit = (dataLogin: LoginType) => usePostLogin(dataLogin);

    const [errorMensaje, setErrorMensaje] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<string>('')

    const loginHandle = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const userId = user?.id as string;
        login(userId)
      }
      if (form.current) {
        const formData = new FormData(form.current);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
    
        console.log('DataIngresar: ', { email, password });
    
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
    
          console.log('ResponseData: ', data);
          const userId = data?.user?.id as string;
          console.log('userId obtenido:', userId); // Agregar para depuración
          login(userId); // Llamada a la función login aquí
          setErrorMensaje('Login successful');
    
          if (error) {
            setErrorMensaje(error.message);
          } else {
            setErrorMensaje(null);
          }
        } catch (error) {
          console.error('Error en loginHandle:', error);
        }
      } else {
        console.error('form.current es nulo');
      }
    };
    
    
    
    
    return (
        <div>
            <Container maxWidth="md">
            <form
                method="post"
                className="container mt-10 lg:px-20 lg:m-20 mx-2 pt-10 bg-gray-200"
                onSubmit={loginHandle}
                ref={form}
            >
                
                <h1 className="font-bold text-ser">INGRESAR</h1>
                <div className="py-2 px-2 mt-10">
                <div>Email</div>
                <input
                    className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                </div>
                <div className="py-2 px-2">
                <div>Clave</div>
                <input
                    className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    
                />
                </div>
                <div className="py-4">
                <ButtonSer
                type={ButtonType.Submit}
                name={'INGRESAR'} />
                </div>
                <div className="text-red-500">
                
                </div>
                
            </form>
            {isLoading == 'LOADING' ? (

              <>
              <h1>Descargando....</h1>
              <LoadingSpinner />
              </>
              ) : ( 
              <div className="text-red-500">
                {errorMensaje && (
                  <p className="text-red-500 font-bold mt-2">
                    {errorMensaje}
                  </p>
                )}
              </div>
                )}
              
            </Container>
        </div>
    )
}

export default Ingresar