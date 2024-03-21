import React from 'react';
import styled from 'styled-components';

const Dropdown = styled.select`
  padding: 8px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const DropdownFilter = ({ options, selectedValue, onSelect }) => {
  return (
    <Dropdown value={selectedValue} onChange={(e) => onSelect(e.target.value)}>
      <option value="">All Owners</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </Dropdown>
  );
};

export default DropdownFilter;
