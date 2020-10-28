import React from 'react';
import TodaysSchedule from './TodaysSchedule'
import Reward from './Reward';

export default function CoachingModal({props}) {
    return (
        <>
        {props.user.rewards && props.user.rewards.map((reward) => (
                <Reward
                    cost={reward.cost}
                    title={reward.title}
                    description={reward.description}
                    owner_avatar={reward.owner_avatar}
                    owner_name={reward.owner_name}
                />
            ))
        }
        {props.todays_schedule && <TodaysSchedule props={props.todays_schedule} />}
        </>
)
}