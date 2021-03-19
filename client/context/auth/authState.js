import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import { REGISTRO_EXITOSO, REGISTRO_ERROR, LIMPIAR_ALERTA, LOGIN_EXITOSO, LOGIN_ERROR} from '../../types/index';
import clienteAxios from '../../config/axios';


const AuthState = ({ children }) => {
    
    //Definir un state inicial
    const initialState = {
        token:typeof window !== 'undefined' ? localStorage.getItem('token') : null,
        autenticado: null,
        usuario: null,
        mensaje: null
    }
    //Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }
        //Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    // Autenticar usuarios
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
        //Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    //Usuario autenticado
    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        })
    }

    return (
        <authContext.Provider value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            usuarioAutenticado,
            registrarUsuario,
            iniciarSesion
        }}>
            {children}
        </authContext.Provider>
     );
}
 
export default AuthState;