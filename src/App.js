import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import { CheckCircle, XCircle, Activity, List, AlertTriangle, AlertCircle, Star, ChevronUp, ChevronDown, Circle } from 'react-feather';



function App() {
  const [allTickets, setAllTickets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const API = "https://api.quicksell.co/v1/internal/frontend-assignment";

  const [isEnabled, setIsEnabled] = useState(true);

  const handleDropdownChange = () => {
    setIsEnabled(prevState => !prevState);
  };

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        if (data && data.tickets) {
          setAllTickets(data.tickets);
        }
        if (data && data.users) {
          setAllUsers(data.users);
        }
      })
      .catch(error => console.error(error));
  }, []);

  // Create a dictionary where user IDs are keys and user objects are values
  const userDictionary = {};
  allUsers.forEach(user => {
    userDictionary[user.id] = user;
  });

  const filteredBoards = isEnabled
    ? ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled']
    : ['No Priority', 'Urgent', 'High', 'Medium', 'Low'];

  return (
    <div className="App">
      <div className="app_navbar">
        Kanban Board
        <div className="filter">
          <select value={isEnabled} onChange={handleDropdownChange}>
            <option value={true}>Status</option>
            <option value={false}>Priority</option>
          </select>
        </div>
      </div>
      <div className='app_outer'>
        <div className='app_boards'>
          {filteredBoards.map(boardTitle => (
            <Board
              key={boardTitle}
              logo={getBoardLogo(boardTitle, isEnabled)}
              title={boardTitle}
              tickets={filterTickets(allTickets, boardTitle, isEnabled, userDictionary)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Filter tickets based on status or priority
function filterTickets(tickets, filter, byStatus, userDictionary) {
  return tickets.filter(ticket => {
    if (byStatus) {
      return ticket.status === filter;
    } else {
      const priorityMapping = {
        'No Priority': 0,
        'Urgent': 4,
        'High': 3,
        'Medium': 2,
        'Low': 1,
      };
      return ticket.priority === priorityMapping[filter];
    }
  }).map(ticket => ({
    ...ticket,
    user: userDictionary[ticket.userId]
  }));
}

// Get the appropriate logo for each board
function getBoardLogo(boardTitle, isEnabled) {
  if (isEnabled) {
    switch (boardTitle) {
      case 'Backlog':
        return <AlertTriangle />;
      case 'Todo':
        return <List />;
      case 'In progress':
        return <Activity />;
      case 'Done':
        return <CheckCircle />;
      case 'Cancelled':
        return <XCircle />;
      default:
        return null;
    }
  } else {
    switch (boardTitle) {
      case 'No Priority':
        return <Circle />;
      case 'Urgent':
        return <AlertCircle />;
      case 'High':
        return <Star />;
      case 'Medium':
        return <ChevronUp />;
      case 'Low':
        return <ChevronDown />;
      default:
        return null;
    }
  }
}

export default App;
