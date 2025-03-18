import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './Components/Userlist';

function App() {
  const handleEdit = (user) => {
    console.log('Editar usuario:', user);
  };

  const handleDelete = (username) => {
    console.log('Eliminar usuario:', username);
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Usuarios</h1>
      <UserList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
