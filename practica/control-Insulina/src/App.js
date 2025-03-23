import React, { useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import FormularioUsuario from './components/FormularioUsuario';
import Tabla from './components/Tabla';
import ListaDeUsuarios from './components/ListaDeUsuarios'; 
import Estadisticas from './components/Estadisticas';

const App = () => {
    const month = 3; 
    const year = 2025; 

    return (
        <UserProvider>
            <h1>Control de Insulina</h1>
            <FormularioUsuario />
            <UserContext.Consumer>
                {({ users, Eliminar, agregarUsuario}) => (
                    <>
                        <Tabla users={users} Eliminar={Eliminar} />
                        <ListaDeUsuarios /> {/* Aquí se muestra la lista de usuarios */}
                    </>
                )}
            </UserContext.Consumer>
            <Estadisticas month={month} year={year} /> {/* Asegúrate de que Statistics acepte month y year */}
        </UserProvider>
    );
};

export default App;
