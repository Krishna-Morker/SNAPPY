import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { SearchUsers } from '../utils/APIRoutes';

const SearchBar = ({ closeSearchBar, setCurrentSelected, changeChat, currentUser }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${SearchUsers}/${currentUser._id}`, { params: { query: query } });
      setFilteredData(response.data);
    };
    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  const handleButtonClick = (item) => {
    setCurrentSelected(item._id);
    closeSearchBar();
    changeChat(item);
  };

  return (
    <StyledSearchBarContainer>
      <StyledCloseButton onClick={closeSearchBar}>X</StyledCloseButton>
      <StyledTitle>Search User</StyledTitle>
      <StyledInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <StyledSuggestions>
        {filteredData &&
          filteredData.map((item, index) => (
            <StyledButton key={index} onClick={() => handleButtonClick(item)}>
              <img src={item.avatarImage} alt="Profile" />
              {item.username}
            </StyledButton>
          ))}
      </StyledSuggestions>
    </StyledSearchBarContainer>
  );
};

export default SearchBar;

const StyledSearchBarContainer = styled.div`
  position: relative;
  width: 250px;
  height: 380px; /* Adjusted height for 6 full buttons + half button + title */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: #fff;
  color: #333;
  font-size: 16px;
`;

const StyledSuggestions = styled.div`
  max-height: 280px; /* Maximum height for the list of buttons before scroll bar appears */
  overflow-y: auto; /* Add scroll bar when needed */
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;



















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { SearchUsers } from '../utils/APIRoutes';

// const SearchBar = ({ closeSearchBar ,setCurrentSelected , changeChat , currentUser}) => {
//   const [query, setQuery] = useState('');
//   const [filteredData, setFilteredData] = useState(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(`${SearchUsers}/${currentUser._id}`, { params: { query: query } });
//       setFilteredData(response.data);
//     };
//     fetchData();
//   }, [query]);

//   const handleInputChange = (event) => {
//     const inputValue = event.target.value;
//     setQuery(inputValue);
//   };

//   const handleButtonClick = (item) => {
//     setCurrentSelected(item._id);
//     closeSearchBar();
//     changeChat(item)
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={query}
//         onChange={handleInputChange}
//       />
//       <StyledButtonContainer>
//         {filteredData &&
//           filteredData.map((item, index) => (
//             <button key={index} onClick={() => handleButtonClick(item)}>
//               <img src={item.avatarImage} alt="Profile" />
//               {item.username}
//             </button>
//           ))}
//       </StyledButtonContainer>
//     </div>
//   );
// };

// export default SearchBar;

// const StyledButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { SearchUsers } from '../utils/APIRoutes';

// const SearchBar = ({ closeSearchBar, setCurrentSelected, changeChat, currentUser }) => {
//   const [query, setQuery] = useState('');
//   const [filteredData, setFilteredData] = useState(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(`${SearchUsers}/${currentUser._id}`, { params: { query: query } });
//       setFilteredData(response.data);
//     };
//     fetchData();
//   }, [query]);

//   const handleInputChange = (event) => {
//     const inputValue = event.target.value;
//     setQuery(inputValue);
//   };

//   const handleButtonClick = (item) => {
//     setCurrentSelected(item._id);
//     closeSearchBar();
//     changeChat(item);
//   };

//   return (
//     <StyledSearchBarContainer>
//       <StyledInput
//         type="text"
//         placeholder="Search..."
//         value={query}
//         onChange={handleInputChange}
//       />
//       <StyledButtonContainer>
//         {filteredData &&
//           filteredData.slice(0, 6).map((item, index) => (
//             <StyledButton key={index} onClick={() => handleButtonClick(item)}>
//               <img src={item.avatarImage} alt="Profile" />
//               {item.username}
//             </StyledButton>
//           ))}
//       </StyledButtonContainer>
//     </StyledSearchBarContainer>
//   );
// };

// export default SearchBar;

// const StyledSearchBarContainer = styled.div`
//   position: fixed;
//   top: 20px;
//   right: 20px;
//   width: 250px;
//   max-height: 230px;
//   overflow-y: auto;
//   border-radius: 10px;
//   background-color: #fff;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   box-sizing: border-box;
//   border: 1px solid #ccc;
//   border-radius: 10px 10px 0 0;
// `;

// const StyledButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledButton = styled.button`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   border: none;
//   background-color: transparent;
//   cursor: pointer;

//   img {
//     width: 24px;
//     height: 24px;
//     border-radius: 50%;
//     margin-right: 10px;
//   }
// `;