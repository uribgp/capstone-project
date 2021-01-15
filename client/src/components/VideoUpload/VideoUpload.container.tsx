import React, { ReactElement, useEffect, useRef, useState } from "react";
import Button from "../Shared/Button/Button";
import Calendar from "../Shared/Calendar/Calendar";
import CalendarContainer from "../Shared/Calendar/Calendar.container";
import Container from "../Shared/Container/Container";
import SelectDropdown from "../Shared/SelectDropdown/SelectDropdown";
import TitleMedium from "../Shared/Typography/TitleMedium";
import VideoUpload from "./VideoUpload";
import { setsAndRepsValues } from "../../utils/form-values";
import { SelectDropdownType } from "../../types/select-dropdown";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import VideoUploadForm from "./VideoUploadForm";
import Input from "../Shared/Input/Input";
import CardCategory from "../Shared/CardCategory/CardCategory";
import Textarea from "../Shared/Textarea/Textarea";
interface Props {}

interface Stats {
  sets: SelectDropdownType;
  reps: SelectDropdownType;
  category: string;
}

export default function VideoUploadContainer({}: Props): ReactElement {
  const [formStage, setFormStage] = useState(1);
  const [video, setVideo] = useState("");
  const [videoInformation, setVideoInformation] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    videoError: "",
    categoryError: "",
  });

  useEffect(() => {
    if (videoInformation.category) setErrors({ ...errors, categoryError: "" });
  }, [videoInformation.category]);

  useEffect(() => {
    if (video) setErrors({ ...errors, videoError: "" });
  }, [video]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleOnVideoChange = (event: React.FormEvent<HTMLInputElement>) => {
    setVideo(event.currentTarget.value);
  };

  const handleOnCategoryClick = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const { category } = videoInformation;
    value === category
      ? setVideoInformation({ ...videoInformation, category: "" })
      : setVideoInformation({ ...videoInformation, category: value });
  };

  const handleOnUploadClick = () => {
    if (!video)
      setErrors((prev) => ({ ...prev, videoError: "Please select a video" }));
    
      if (!videoInformation.category)
      setErrors((prev) => ({
        ...prev,
        categoryError: "Please select a cateogry",
      }));
  };

  const handleOnTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setVideoInformation({ ...videoInformation, title: value });
  };

  const handleOnDescriptionChange = (
    event: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.currentTarget;
    setVideoInformation({ ...videoInformation, description: value });
  };

  const { category, title, description } = videoInformation;
  return (
    <div>
      <Container>
        <div>
          <CardCategory
            isSelected={category === "Bench Press"}
            onChange={(event) => handleOnCategoryClick(event)}
            category="Bench Press"
            value={"Bench Press"}
          />
          <CardCategory
            isSelected={category === "Squats"}
            onChange={(event) => handleOnCategoryClick(event)}
            category="Squats"
            value={"Squats"}
          />
          <CardCategory
            isSelected={category === "Other"}
            onChange={(event) => handleOnCategoryClick(event)}
            category="Other"
            value={"Other"}
          />
          {errors.categoryError && <div>{errors.categoryError}</div>}
        </div>
        <Input
          value={video}
          placeholder=""
          type="file"
          onChange={(event) => handleOnVideoChange(event)}
        />
        {errors.videoError && <div>{errors.videoError}</div>}

        <Input
          value={title}
          placeholder="Title"
          onChange={(event) => handleOnTitleChange(event)}
        />
        <Textarea
          value={description}
          onChange={(event) => handleOnDescriptionChange(event)}
        />
        <Button onClick={handleOnUploadClick}>Upload</Button>
      </Container>
    </div>
  );
}
