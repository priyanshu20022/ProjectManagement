import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ProjectsTable from './components/ProjectsTable';
import CreateProjectButton from './components/CreateProjectButton';
import ProjectSearch from './components/ProjectSearch';
import Share from './components/Share'; 
import styled from 'styled-components';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import DropdownFilter from './components/DropdownFilter';
import { ToastContainer } from 'react-toastify';

const Container = styled.div`
  margin: 20px;
`;

function App() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [owners, setOwners] = useState([]);
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await fetch('https://localhost:7250/api/Project');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      console.log(response);
      const data = await response.json();
      setProjects(data); 
      console.log(projects);
      console.log("Projects Data:", data);
      const uniqueOwners = [...new Set(data.map(project => project.ownedBy))];
  console.log("Unique Owners:", uniqueOwners); 
      setOwners(uniqueOwners);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
      
  const addProject = async (projectName, ownedBy) => { 
    try {
      const newProject = {
        Name: projectName,
        LastModified: new Date().toISOString(),
        CreatedOn: new Date().toISOString(),
        OwnedBy: ownedBy, 
      };

      const response = await fetch('https://localhost:7250/api/Project/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      fetchProjects(); 
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };
      const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
      };
    
      const handleShare = async (index) => {
        try {
          const project = projects[index];
          project.shared = true;
          const response = await fetch(`https://localhost:7250/api/Project/${project.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update project status');
          }
    
          fetchProjects();
        } catch (error) {
          console.error('Error sharing project:', error);
        }
      };

      const handleDelete = async (projectId) => {
        try {
            const response = await fetch(`https://localhost:7250/api/Project/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
    
            fetchProjects(); 
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };
 
      const handleEdit = async (index, newName) => {
        try {
          const updatedProject = {
            ...projects[index],
            Name: newName,
            LastModified: new Date().toISOString() 
          };
      
          const response = await fetch(`https://localhost:7250/api/Project/${updatedProject.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject),
          });
      
          if (!response.ok) {
            throw new Error('Failed to edit project');
          }
      
          fetchProjects(); 
        } catch (error) {
          console.error('Error editing project:', error);
        }
      };
      

      const filteredProjects = projects.filter((project) =>
      
      project &&
project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
(selectedOwner === '' || project.ownedBy.toLowerCase() === selectedOwner.toLowerCase())
    );
    

  return (
    <AuthProvider>

    <Router>
       <Header />
       <Container>
        <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
          <Route path="/" element={
            <>
              <CreateProjectButton addProject={addProject} ownedBy="OwnerName" /> 
              <ProjectSearch handleSearch={handleSearch} />
              <DropdownFilter
                options={owners}
                selectedValue={selectedOwner}
                onSelect={setSelectedOwner}
              />
              <ProjectsTable
                projects={filteredProjects}
                onDelete={(projectId) => handleDelete(projectId)}
                onEdit={handleEdit}
                onShare={handleShare}
              />
            </>
          } />
          <Route path="/share" element={<Share />} />
        </Routes>
      </Container>
    </Router>
    <ToastContainer /> 
    </AuthProvider>

  );
}

export default App;
