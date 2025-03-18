const API_URL = 'http://localhost/api';

export const userService = {
  getUsers: async () => {
    const response = await fetch(`${API_URL}/get_users.php`);
    return response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/create_user.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  updateUser: async (userData) => {
    const response = await fetch(`${API_URL}/update_user.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  deleteUser: async (username) => {
    const response = await fetch(`${API_URL}/delete_user.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    return response.json();
  },
};
