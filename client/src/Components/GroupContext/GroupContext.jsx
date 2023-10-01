// import React, {createContext, useState} from 'react';

// const GroupContext = createContext()

// const GroupProvider = ({children}) => {
//     const [selectedGroups,setSelectedGroups] = useState(
//         () => {
//             const storedGroups = localStorage.getItem('selectedGroups');
//             return storedGroups ? JSON.parse(storedGroups) : [];
//         }
//     )

//     const addSelectedGroup = (group) => {
//         setSelectedGroups((prevGroups) => [...prevGroups, group]);
//       };

//     //   const removeSelectedGroup = (groupId) => {
//     //     const updatedGroups = selectedGroups.filter((group) => group.id !== groupId);
//     //     setSelectedGroups(updatedGroups);
//     //     // Update localStorage to reflect the removed group
//     //     localStorage.setItem('selectedGroups', JSON.stringify(updatedGroups));
//     //   }

//     return (
//         <GroupContext.Provider value = {{selectedGroups,addSelectedGroup,setSelectedGroups}}>
//             {children}
//             </GroupContext.Provider>
//     )
// }

// export {GroupProvider,GroupContext}



import React, {createContext, useState} from 'react';

const GroupContext = createContext()

const GroupProvider = ({children}) => {
    const [refresh,setRefresh] = useState(
        false
    )

    

    
    return (
        <GroupContext.Provider value = {{refresh,setRefresh}}>
            {children}
            </GroupContext.Provider>
    )
}

export {GroupProvider,GroupContext}