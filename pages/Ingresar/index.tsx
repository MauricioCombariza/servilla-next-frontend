import React from "react";
import { ButtonSer, ButtonType } from "../../components/ButtonSer";
import Container from '@mui/material/Container';
import { useAuth } from "../../Auth";
import { AuthContextProps } from "../../Auth";
import { LoginType } from "../../Hooks/usePostLogin";
import { usePostLogin } from "../../Hooks/usePostLogin";

interface FormData {
    auth: AuthContextProps
    email: string;
    password: string;
    API: string;
  }
  

const Ingresar = () => {
    const auth = useAuth() as AuthContextProps
    const form = React.useRef<HTMLFormElement>(null)
    
    const OnFormSubmit = (dataLogin: LoginType) => usePostLogin(dataLogin);

    const [errorMensaje, setErrorMensaje] = React.useState<string | null>(null);


    
    const login = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (form.current) {
            const formData = new FormData(form.current);
            const data: FormData = {
              auth: auth,
            //   API: 'https://servilla-server-api.onrender.com/user/login',
              API: 'http://127.0.0.1:8000/user/login',
              email: formData.get('email') as string,
              password: formData.get('password') as string
            };
            // console.log('Data en ingreso:', data)
        
            // OnFormSubmit(data);
            const response = await OnFormSubmit(data);
            // console.log('Ingresar data:', response)
            
            if (response !== undefined) {
                console.error("Error")
            setErrorMensaje(response);
            } else {
            setErrorMensaje(null); // Limpiar el mensaje de error si la solicitud es exitosa
            }
        } else {
                    // Manejar el caso en el que form.current es nulo
                    console.error('form.current es nulo');
                }  
        }
    
    
    return (
        <div>
            <Container maxWidth="md">
            <form
                method="post"
                className="container mt-10 lg:px-20 lg:m-20 mx-2 pt-10 bg-gray-200"
                onSubmit={login}
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
            <div className="text-red-500">
            {errorMensaje && (
              <p className="text-red-500 font-bold mt-2">
                {errorMensaje}
              </p>
            )}
          </div>
            </Container>
        </div>
    )
}

export default Ingresar