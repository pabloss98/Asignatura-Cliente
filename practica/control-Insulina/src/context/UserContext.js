import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const validationPatterns = {
        usuario: /^[a-z][a-z0-9]{5,}$/, 
        contra: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 
    };

    const addUser = (newUser) => {
        setUsers([...users, newUser]);
    };

    const deleteUser = (userId) => {
        
        setUsers(users.filter(user => user.idUsuario !== userId));
    };

    return (
        <UserContext.Provider value={{ users, addUser, deleteUser, validationPatterns }}>
            {children}
        </UserContext.Provider>
    );
};
