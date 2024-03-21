import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProjectDetails = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Label = styled.strong`
  color: #555;
`;

const Value = styled.span`
  color: #333;
`;

const Share = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const encryptedProjectData = queryParams.get('project');

  if (!encryptedProjectData) {
    return <Container>No project data to display.</Container>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const decryptedProjectData = atob(encryptedProjectData); 
  const project = JSON.parse(decryptedProjectData);

  return (
    <Container>
      <Title>Shared Project Details</Title>
      <ProjectDetails>
        <p><Label>Name:</Label> <Value>{project.name}</Value></p>
        <p><Label>Last Modified:</Label> <Value>{formatDateTime(project.lastModified)}</Value></p>
        <p><Label>Created On:</Label> <Value>{formatDate(project.createdOn)}</Value></p>
        <p><Label>Owned By:</Label> <Value>{project.ownedBy}</Value></p>
      </ProjectDetails>
    </Container>
  );
};

export default Share;
