import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 8px;
  margin-bottom: 20px;
`; 

const ProjectSearch = ({ handleSearch }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <Input
      type="text"
      onChange={handleChange}
      placeholder="Search by project name"
    />
  );
};

export default ProjectSearch;
