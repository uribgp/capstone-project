import React, { useState } from 'react';
import FullscreenModal from '../../Shared/FullscreenModal/FullscreenModal';
import UploadVideoModal from '../UploadVideoModal/UploadVideoModal';

export default function UploadVideo() {
    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(!showModal)
    }


    return (
    <div>
        <button onClick={handleModal}>
            UploadVideo
        </button>
        {showModal && <FullscreenModal onCloseClick={handleModal}>
            <UploadVideoModal />
        </FullscreenModal>}
    </div>
    )
  }
  