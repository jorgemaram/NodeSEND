import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';


const Header = () => {

    //Routing
    const router = useRouter();

    //Extraer usuario autenticado del Storage
    const AuthContext = useContext(authContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

    //Context de la app
    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;


    useEffect(() => {
        usuarioAutenticado()
    }, []);

    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img onClick={() => redireccionar()} className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" />
            <div>
                {
                    usuario ? (
                        <div className='flex items-center'>
                            <p className='mr-2'>Hola {usuario.nombre}</p>
                            <button type='button' className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase" onClick={() => cerrarSesion()}>Cerrar sesión</button>
                        </div>
                    ) : (
                        <>
                            <Link href='/login'>
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar sesión</a>
                            </Link>
                            <Link href='/crearcuenta'>
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear cuenta</a>
                            </Link>
                        </>
                    )
                }

            </div >
        </header >
    );
}

export default Header;