import React,{ useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";
import { updateProfile,checkUsernameValidity } from "../../utils/APIRoutes"

export default function ProfileEdit( { onEdit , currentUser } ){
  const [usernameError, setUsernameError] = useState(false);
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = async (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
    if(name=="username")
    {
        const response = await axios.get(`${checkUsernameValidity}/${currentUser.username}/${value}`);
        setUsernameError(response.data.status);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !usernameError) {
      updateProfileData();
    }
  };

  const updateProfileData = async () => {
    const response = await axios.post(`${updateProfile}/${currentUser._id}`,editInputs);
    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify(response.data)
    );
    await onEdit();
  };

  return (
    <div className="profile-card" onKeyDown={handleKeyPress}>
      <div className="edit-btn">
        <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
      </div>
    <div className="profile-card-scrollable">
      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          onChange={getInput}
          className={`input ${usernameError ? 'input-error' : ''}`}
          placeholder="Name"
          name="username"
          value={editInputs.username}
        />
        { usernameError && <div className="error-message">Username is not available</div>}
        <label>Headline</label>
        <input
          onChange={getInput}
          className="input"
          placeholder="Headline"
          value={editInputs.headline}
          name="headline"
        />
        <label>Country</label>
        <input
          onChange={getInput}
          className="input"
          placeholder="Country"
          name="country"
          value={editInputs.country}
        />
        <label>City</label>
        <input
          onChange={getInput}
          className="input"
          placeholder="City"
          name="city"
          value={editInputs.city}
        />
        <label>Company</label>
        <input
          onChange={getInput}
          className="input"
          placeholder="Company"
          value={editInputs.company}
          name="company"
        />
        <label>Industry </label>
        <input
          onChange={getInput}
          className="input"
          placeholder="Industry"
          name="industry"
          value={editInputs.industry}
        />
        <label>College</label>
        <input
          onChange={getInput}
          className="input"
          placeholder="College"
          name="college"
          value={editInputs.college}
        />
        <label>Website</label>
        <input
          onChange={getInput}
          className="input"
          placeholder="Website"
          name="website"
          value={editInputs.website}
        />
        <label>About</label>
        <textarea
          placeholder="About Me"
          className="textArea"
          onChange={getInput}
          rows={5}
          name="aboutMe"
          value={editInputs.aboutMe}
        />
        <label>Skills</label>
        <input
          onChange={getInput}
          className="input"
          placeholder="Skill"
          name="skills"
          value={editInputs.skills}
        />
      </div>
      <div className="save-container">
        <button className={`save-btn ${usernameError ? 'disabled-button' : ''}`} onClick={updateProfileData} disabled={usernameError}>
          Save
        </button>
      </div>
      </div>
    </div>
  );
}