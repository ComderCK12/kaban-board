import React from 'react';
import './Card.css';
import Chip from '../Chip/Chip';

import { AlertCircle, Star, ChevronUp, ChevronDown, Circle, CheckCircle, XCircle } from 'react-feather';

const priorityDescriptionMapping = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
  };

const priorityIconMapping = {
  4: <AlertCircle size={16} />,
  3: <Star size={16} />,
  2: <ChevronUp size={16} />,
  1: <ChevronDown size={16} />,
  0: <Circle size={16} />
};

const Card = ({ ticket }) => {
    return (
      <div className="card">
        <div className="card_top">
          <div className='card_label'>
            <Chip text={ticket.id} />
          </div>
          <div className='card_user'>
            {ticket.user && (
              <p>
                {ticket.user.name}{' '}
                {ticket.userId === "usr-1" ? (
                    <XCircle className="red-dot" size={12} />
                ) : (
                  <CheckCircle className="green-dot" size={12} />
                )}
              </p>
            )}
          </div>
        </div>
        <div className='card_middle'>
          <p>{ticket.title}</p>
        </div>
        <div className='card_bottom'>
          {priorityIconMapping[ticket.priority]} Priority: {priorityDescriptionMapping[ticket.priority]}
          <p className='tag_info'>{ticket.tag}</p>
        </div>
      </div>
    );
  }

export default Card;
