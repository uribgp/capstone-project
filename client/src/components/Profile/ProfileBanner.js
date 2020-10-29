import React from 'react';
import './ProfileBanner.scss';

export default function ProfileBanner({ banner, avatar, username }) {


    return (
            <div className='main_banner_container'>
                <img src={banner} alt=""/>

            </div>
    )
}
