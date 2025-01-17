import React, { useState } from "react";
import Modal from 'react-modal';
import "./Home.css";
import Navbar from "../components/Navbar";

// Custom modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',          // Adjust width as needed
    height: '53vh',      // Set a specific height
    overflow: 'hidden',    // Prevent scrollbars
  },
};

Modal.setAppElement('#root');  // Update this according to your root element ID

function Home() {
  const green = "#28a745";
  
  const [modalIsOpen, setIsOpen] = useState(false);  // Modal state
  const [teamName, setTeamName] = useState('');  // State for team name
  const [teamDescription, setTeamDescription] = useState('');  // State for team description
  const [teamId, setTeamId] = useState('');  // State for joining team by ID
  const [privacy, setPrivacy] = useState('public');  // Privacy setting for the team

  // Open and close modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Handle create team form submission
  const handleCreateTeam = async (e) => {
    e.preventDefault();  // Prevent page reload
    try {
      const response = await fetch('http://localhost:4000/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName,
          description: teamDescription,
          createdBy: '6700db6205dfae661d3b4ad2',  // Replace with actual user ID
          privacy,
        }),
      });

      const result = await response.json();
      if (response.status === 201) {
        alert(`Team created successfully! Join code: ${result.joinCode}`); // Display the join code
        console.log(result); // Log response for debugging
      } else {
        alert('Failed to create team: ' + result.message);
      }

      // Close modal and reset form
      setIsOpen(false);
      setTeamName('');
      setTeamDescription('');
    } catch (error) {
      console.error('Error creating team:', error);
      alert('An error occurred while creating the team.');
    }
  };

  // Handle Join button functionality
  // Handle Join button functionality
const handleJoinTeam = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/teams/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: '6700db6205dfae661d3b4ad2',  // Replace with actual user ID
        joinCode: teamId, // Use join code instead of team ID
      }),
    });

    const result = await response.json();
    if (response.status === 200) {
      alert(`Successfully joined team!`);
      console.log(result); // Log response for debugging
    } else {
      alert('Failed to join team: ' + result.message);
    }
  } catch (error) {
    console.error('Error joining team:', error);
    alert('An error occurred while trying to join the team.');
  }
};


  return (
    <>
      {/* <Navbar /> */}
      <div className="container" style={{width:"85vw",height:"90vh"
      }}>
      <div className="row flex justify-content-between">
        
        <div
          className="col-4 m-2 d-grid  bg-secondary rounded-2"
          style={{ height: "35vh" }}
        >
          <div className="row m-1 d-flex justify-content-between rounded-2">
            {/* Create Button */}
            <div
              className="col-3 m-1 btn rounded-2"
              style={{ backgroundColor: green }}
              onClick={openModal}  // Open modal on click
            >
              Create
            </div>

            {/* Join Button */}
            <div
              className="col-3 m-1 btn rounded-2"
              style={{ backgroundColor: green }}
              onClick={handleJoinTeam}  // Call join function on click
            >
              Join
            </div>
          </div>
          <br />
          <input
            type="text"
            name="TeamId"
            className="row rounded-2"
            placeholder="Enter Team ID"
            style={{ width: "22vw" }}
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}  // Set the team ID for joining
          />
          <br />
          <div className="row m-1 d-flex justify-content-between rounded-2">
            <div
              className="col-3 m-1 btn rounded-2"
              style={{ backgroundColor: green }}
            >
              Guide
            </div>
            <div
              className="col-3 m-1 btn rounded-2"
              style={{ backgroundColor: green }}
            >
              Buddy
            </div>
          </div>
          <br />
          <div
            className="row justify-content-center btn rounded-2 w-25"
            style={{ backgroundColor: green }}
          >
            Search
          </div>
        </div>
        <div
          className="col-7 bg-secondary m-3"
          style={{ height: "35vh" }}
        >
          <h3 className="text-center">Teams</h3>
        </div>
      </div>

      {/* Modal for Creating Teams */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  style={customStyles}
>
  <h2 className="text-center">Create Team</h2>
  <form onSubmit={handleCreateTeam} className="p-3">  
    <div className="mb-3">
      <label htmlFor="teamName" className="form-label">Team Name:</label>
      <input
        type="text"
        id="teamName"
        className="form-control"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)} // Set team name
        required
      />
    </div>
    
    <div className="mb-3">
      <label htmlFor="teamDescription" className="form-label">Description:</label>
      <textarea
        id="teamDescription"
        className="form-control"
        value={teamDescription}
        onChange={(e) => setTeamDescription(e.target.value)} // Set team description
      />
    </div>
    
    <div className="mb-3">
      <label htmlFor="privacy" className="form-label">Privacy:</label>
      <select
        id="privacy"
        className="form-select"
        value={privacy}
        onChange={(e) => setPrivacy(e.target.value)} // Set privacy
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
    </div>
    
    <div className="d-flex justify-content-between">
      <button type="submit" className="btn btn-success">Create Team</button>
      <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
    </div>
  </form>
</Modal>
</div>
    </>
  );
}

export default Home;
