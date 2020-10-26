import React from 'react';
import './ProfileBanner.scss';


export default function ProfileBanner({ banner, avatar, username }) {


    return (
        <>
            <div className='main_banner_container'>
                <div className='main_banner-banner-image'>
                    <img src={banner} />
                </div>
                <div className='banner_user_info'>
                    <div className='banner_user-avatar'>
                        <img src={avatar} />
                        <div className='banner_user-info'>
                            <div className='banner_user-info-name'>
                                {username}
                            </div>
                            <div className='banner_user-subscribers'>
                                100
                        </div>
                        </div>
                    </div>
                    <div className='banner_user-subscribe-button'>
                        <button>Subscribe now</button>
                    </div>

                </div>
            </div>
        </>
    )
}
