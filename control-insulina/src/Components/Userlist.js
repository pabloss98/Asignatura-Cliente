import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

function UserList({ onEdit, onDelete }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost/api/get_users.php');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre de Usuario</th>
          <th>Nombre y Apellidos</th>
          <th>Fecha de Nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.fullName}</td>
            <td>{user.birthDate}</td>
            <td>
              <Button variant="info" onClick={() => onEdit(user)}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => onDelete(user.username)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserList;
