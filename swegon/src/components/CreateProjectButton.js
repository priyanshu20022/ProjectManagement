import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const Button = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: darkgreen;
  }
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const CreateProjectButton = ({ addProject }) => {
  const { getNameFromToken } = useAuth(); 
  const [projectName, setProjectName] = useState('');

  const handleChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const creatorName = getNameFromToken(); 
    addProject(projectName, creatorName); 
    setProjectName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" value={projectName} onChange={handleChange} placeholder="Enter project name" />
      <Button type="submit">Create New Project</Button>
    </form>
  );
};

export default CreateProjectButton;
