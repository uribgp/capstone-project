import React, { useState } from 'react';
import FullscreenModal from '../../Shared/FullscreenModal/FullscreenModal';
import UploadVideoModal from '../UploadVideoModal/UploadVideoModal';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import './UploadVideo.scss';
import IconButton from '../IconButton/IconButton';

export default function UploadVideo() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="upload-video-modal">
      <IconButton icon={<AiOutlineVideoCamera />} onClick={handleModal} />
      {showModal && (
        <FullscreenModal onCloseClick={handleModal}>
          <UploadVideoModal />
        </FullscreenModal>
      )}
    </div>
  );
}
