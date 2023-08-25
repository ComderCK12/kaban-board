// import React, { useEffect, useState } from 'react';
// import './Board.css';
// import Card from './Card/Card';
// import { MoreHorizontal, Plus } from 'react-feather';

// const Board = (props) => {
//   const [todoTickets, setTodoTickets] = useState([]);
//   const API = "https://api.quicksell.co/v1/internal/frontend-assignment";

//   useEffect(() => {
//     fetch(API)
//       .then(response => response.json())
//       .then(data => {
//         if (data && data.tickets) {
//           const ticketsData = data.tickets;
//           const todoTicketsData = ticketsData.filter(ticket => ticket.status === 'Todo');
//           setTodoTickets(todoTicketsData);
//         }
//       })
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div className="board">
//       <div className='board_top'>
//         <p className='board_top_title'>{props.logo} {" "} {props.title} <span>{" "}2</span> </p>
//         <Plus />
//         <MoreHorizontal />
//       </div>

//       <div className="board_cards">
//         {todoTickets.map(ticket => (
//           <Card key={ticket.id} ticket={ticket} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Board;


// Board.jsx
import React from 'react';
import './Board.css';
import Card from './Card/Card';
import { MoreHorizontal, Plus } from 'react-feather';
 
const Board = (props) => {
  return (
    <div className="board">
      <div className='board_top'>
      <p className='board_top_title'> {props.logo} {" "} {props.title} <span>&nbsp;{props.tickets.length}</span></p>
        <Plus />
        <MoreHorizontal />
      </div>
      <div className="board_cards">
        {props.tickets.map(ticket => (
          <Card key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default Board;
