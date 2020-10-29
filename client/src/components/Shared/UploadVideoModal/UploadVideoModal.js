import React, { useState, useEffect } from 'react';
import { postVideo } from '../../../store/videos/videos-actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../store/category/category-actions';
import IconButton from '../IconButton/IconButton';
import { AiFillCamera } from 'react-icons/ai';
import { MdFitnessCenter } from 'react-icons/md';
import { GiWeightLiftingUp, GiWeightLiftingDown } from 'react-icons/gi';
import { RiVideoUploadLine, RiFolderUploadLine } from 'react-icons/ri';
import './UploadVideoModal.scss';
import Button from '../Button/Button';
import Input from '../Input/Input';
import ButtonIcon from '../Button/ButtonIcon';

export default function UploadVideoModal() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [categoryChoiceId, setCategoryChoiceId] = useState(1);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((state) => state.categories.categories);

  const handleVideoChange = (e) => {
    setFile({
      raw: e.target.files[0],
    });
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFile({
      raw: e.target.files[0],
    });
  };

  const handleCategoryChange = (e) => {
    setCategoryChoiceId(e.currentTarget.id);
  };

  const grabVideo = () => {
    document.getElementById('fileVideoInput').click();
  };

  const grabThumbnail = () => {
    document.getElementById('fileImageInput').click();
  };

  const handleUpload = () => {
    dispatch(
      postVideo(title, description, thumbnailFile, categoryChoiceId, file)
    );
  };

  return (
    <div className="video-modal">
      <div className="title-box">
        <Input
          icon={<MdFitnessCenter />}
          placeholder="Name your video"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="description-box">
        <Input
          icon={<GiWeightLiftingUp />}
          placeholder="Brief Description of your lift"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="categories-select">
        {categories &&
          categories.length &&
          categories.map((category) => {
            if (category.main === true && categoryChoiceId == category.id) {
              return (
                <button
                  className="selected"
                  id={category.id}
                  value={category.id}
                  onClick={handleCategoryChange}
                >
                  {category.title}
                </button>
              );
            } else if (category.main === true) {
              return (
                <button
                  className="unselected"
                  id={category.id}
                  value={category.id}
                  onClick={handleCategoryChange}
                >
                  {category.title}
                </button>
              );
            }
          })}
      </div>
      <div className="video-modal-input-wrap">
        <div className="file-container">
          <label for="file">
          <ButtonIcon buttonType="outline-faded" text="Select video" onClick={grabVideo} icon={<RiVideoUploadLine />} />
{/*             <RiVideoUploadLine
              className="buttonFake"
              onClick={grabVideo}
              size="40px"
            /> */}
          </label>
          <input
            style={{ display: 'none' }}
            id="fileVideoInput"
            type="file"
            onChange={handleVideoChange}
            required
          />
        </div>
        <div className="file-container">

          <label for="file">
        <ButtonIcon onClick={grabThumbnail} buttonType="outline-faded" text="Select Thumbnail" icon={<RiFolderUploadLine />} />
           {/*  <RiFolderUploadLine
              className="buttonFake"
              onClick={grabThumbnail}
              size="40px"
            /> */}
            <input
              style={{ display: 'none' }}
              id="fileImageInput"
              type="file"
              onChange={handleThumbnailChange}
              required
            />
          </label>
        </div>
      </div>
      <Button
        buttonType="right-float"
        onClick={handleUpload}
        text={'Upload Video'}
      />
    </div>
  );
}
