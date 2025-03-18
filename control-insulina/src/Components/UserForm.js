import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function UserForm({ user, onSubmit, isEdit }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    birthDate: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nombre de Usuario</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={isEdit}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!isEdit}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Nombre y Apellidos</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit">
        {isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
      </Button>
    </Form>
  );
}

export default UserForm;
