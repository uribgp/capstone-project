import React from 'react';
import './Reward.scss';


export default function Reward({cost, title, description, owner_avatar, owner_name}) {
  
    return (
        <div className="reward_info">
        <div className="reward_title">
            {title}
        </div>
          <div className="reward_description">
              <p>{description}</p>
          </div>
        </div>
    )
}