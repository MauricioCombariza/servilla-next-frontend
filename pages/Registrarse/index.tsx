import { Container } from "@mui/system";
import React from "react";
import { ButtonSer, ButtonType } from "../../components/ButtonSer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { usePostSignup, SignupType } from "../../Hooks/usePostSignup";
import { useAuth, AuthContextProps } from "../../Auth";
import { supabase } from "../../supabase"

interface IFormData {
    username: string | null;
    company: number | 0;
    email: string | '';
    password: string | '';
    address: string | null;
    celular: string | null;
  }

function Registrarse () {
    const auth = useAuth()
    const form = React.useRef(null)

    const [isLoading, setIsLoading] = React.useState(false)

    const OnFormSubmit = async (dataForm: SignupType) => {
        setIsLoading(true); // Marca como cargando al iniciar la solicitud
        await usePostSignup(dataForm);
        setIsLoading(false); // Marca como no cargando al completar la solicitud
      };

      async function signup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const formDataValues: IFormData = {
            username: form.get('username')?.toString() || '',
            company: Number(form.get('company')) || 0,
            address: form.get('address')?.toString() || '',
            email: form.get('email')?.toString() || '',
            password: form.get('password')?.toString() || '',
            celular: form.get('celular')?.toString() || '',
        };
    
        if (formDataValues.email === '') {
            alert('Email es requerido');
            return;
        }
        if (formDataValues.password === '') {
            alert('Password es requerido');
            return;
        }
    
        const { data, error: signUpError } = await supabase.auth.signUp({
            email: formDataValues.email,
            password: formDataValues.password,
        });
    
        if (signUpError) {
            alert(signUpError.message);
            return;
        }
    
        const { error: insertError } = await supabase
            .from('usuarios')
            .insert([{
                nombre: formDataValues.username,
                email: formDataValues.email, // Asumiendo que el email es único y puede ser usado como referencia
                id_bodega: formDataValues.company, // Asumiendo que 'company' se refiere a 'id_bodega'
                direccion: formDataValues.address,
                telefono: formDataValues.celular,
            }]);
    
        if (insertError) {
            alert(insertError.message);
        } else {
            alert('La información se ha creado correctamente');
        }
    }
    return (
        <Container maxWidth='md'>
            <form
            className="container lg:px-20 lg:m-20 mx-2 pt-10 bg-gray-200"
            method="post"
            onSubmit={signup}
            ref={form}
            >
            <h1 className="font-bold text-ser">REGISTRARSE</h1>
            <div className="py-2 px-2">
            <div>Email</div>
            <input
                name="email"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="email"
                placeholder="Email"
            />
            </div>
            <div className="py-2 px-2">
            <div>Password</div>
            <input
                name="password"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="password"
                placeholder="password"
            />
            </div>
            <div className="py-2 px-2">
            <div>Username</div>
            <input
                name="username"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="username"
                placeholder="Usuario"
            />
            </div>
            <div className="py-2 px-2">
            <div>Direccion</div>
            <input
                name="address"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="address"
                placeholder="Direccion"
            />
            </div>
            <div className="py-2 px-2">
            <div>Célular</div>
            <input
                name="celular"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="celular"
                placeholder="Célular"
            />
            </div>
            <div className="py-4">
            <ButtonSer type={ButtonType.Submit} name={"REGISTRARSE"} />
            </div>
        </form>
        {isLoading && <LoadingSpinner />}
        </Container>
    )
}

export default Registrarse