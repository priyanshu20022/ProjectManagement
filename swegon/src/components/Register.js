import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(registerData);
      toast.success('Registration successful', {
        position: 'top-right',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={registerData.name}
        onChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={registerData.email}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={registerData.password}
        onChange={handleChange}
      />
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default Register;
