import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const Table = styled.table`
  width: 100%;
  border: 1px solid black; 
  border-collapse: collapse;
  border-radius: 100px; 
  th,
  td {
    border-top: none; 
    
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    margin-left: 5px;
  }
`;
const ProjectsTable = ({ projects, onDelete, onEdit, onShare }) => {
  const { isLoggedIn, getNameFromToken } = useAuth();

  const [editIndex, setEditIndex] = useState(null);
  const [editedProjectName, setEditedProjectName] = useState('');
  const [sharedProjects, setSharedProjects] = useState([]); 

  const handleEdit = (index, projectName) => {
    setEditIndex(index);
    setEditedProjectName(projectName);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
    return formattedDate;
  };
  const handleSaveEdit = (index) => {
    onEdit(index, editedProjectName); 
    setEditIndex(null);
    setEditedProjectName(''); 
  };


const handleShare = async (index) => {
  const project = projects[index];
  const encryptedProjectData = btoa(JSON.stringify(project)); 
  const shareUrl = `${window.location.origin}/share?project=${encryptedProjectData}`;
  try {
    await navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
    onShare(index);
  } catch (error) {
    console.error('Error copying to clipboard', error);
  }
};

  return (
    <Table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Last Modified</th>
          <th>Created On</th>
          <th>Owned By</th>
          {isLoggedIn() && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedProjectName}
                  onChange={(e) => setEditedProjectName(e.target.value)}
                />
              ) : (
                project.name
              )}
            </td>
            <td>{formatDateTime(project.lastModified)}</td>
            <td>{formatDate(project.createdOn)}</td>
            <td>
  {project.ownedBy} {project.shared == 1? "(shared)" : ""}
</td>

           
            {isLoggedIn() && ( 
          <td className="action-buttons">
            {editIndex === index ? (
              <button onClick={() => handleSaveEdit(index)}>Save</button>
            ) : (
              <button onClick={() => handleEdit(index, project.name)}>Edit</button>
            )}
            <button onClick={() => onDelete(project.id)}>Delete</button>
            <button onClick={() => handleShare(index)}>Share</button>
          </td>
        )}
            </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectsTable;
