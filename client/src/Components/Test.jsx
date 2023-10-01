// import React, { useState } from 'react';

// const MyComponent = () => {
//   const [groupName, setGroupName] = useState('');
//   const [members, setMembers] = useState([]);
//   const users = ['User1', 'User2', 'User3']; // replace this with your users list

//   const handleCheckboxChange = (event, user) => {
//     if (event.target.checked) {
//       setMembers([...members, user]);
//     } else {
//       setMembers(members.filter(member => member !== user));
//     }
//   };

//   const handleRemoveMember = (memberToRemove) => {
//     setMembers(members.filter(member => member !== memberToRemove));
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter group name"
//         value={groupName}
//         onChange={(e) => setGroupName(e.target.value)}
//       />
//       <div>
//         {members.map((member, index) => (
//           <div key={index}>
//             {member}
//             <button onClick={() => handleRemoveMember(member)}>X</button>
//           </div>
//         ))}
//       </div>
//       <div>
//         {users.map((user, index) => (
//           <div key={index}>
//             <input
//               type="checkbox"
//               checked={members.includes(user)}
//               onChange={(e) => handleCheckboxChange(e, user)}
//             />
//             {user}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyComponent;


import React, { useState } from 'react';
// import './YourComponent.css';  // Import your CSS file for styling

const MyComponent = () => {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  const handleCheckboxChange = (event, userName) => {
    if (event.target.checked) {
      setMembers([...members, userName]);
    } else {
      setMembers(members.filter(member => member !== userName));
    }
  };

  const handleAddMemberInputChange = event => {
    setName(event.target.value);
  };

  return (
    <div className="your-component">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={handleAddMemberInputChange}
      />
      <input type="text" placeholder="Add Members" value={members.join(', ')} disabled />
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={e => handleCheckboxChange(e, 'User1')}
            />
            User1
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              onChange={e => handleCheckboxChange(e, 'User2')}
            />
            User2
          </label>
        </li>
        {/* Add more users with similar structure */}
      </ul>
    </div>
  );
};

export default MyComponent;

