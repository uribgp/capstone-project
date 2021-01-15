import React, { ReactElement, useState } from 'react'
import { SelectDropdownType } from '../../types/select-dropdown'
import { setsAndRepsValues } from '../../utils/form-values'
import Button from '../Shared/Button/Button'
import SelectDropdown from '../Shared/SelectDropdown/SelectDropdown'
import TitleMedium from '../Shared/Typography/TitleMedium'
import VideoUploadForm from './VideoUploadForm'

interface Props {
  
}

export default function VideoUploadFormContainer({}: Props): ReactElement {
  /* const [toggledDropdown, setToggledDropdown] = useState('none')
  const [formStage, setFormStage] = useState(1);
  const [videoStats, setVideoStats] = useState<Stats>({
    sets: 0,
    reps: 0,
    category: "",
  });
  const handlOnDropdownToggleClick = (dropdown: 'none' | 'sets' | 'reps') => {
    return dropdown === toggledDropdown ? 
    setToggledDropdown('none')
    :
    setToggledDropdown(dropdown)
    }; 

    const handleOnDropdownAlternativeClick = (
      value: SelectDropdownType,
      stat: "sets" | "reps" | "category"
    ) => {
      setVideoStats({ ...videoStats, [stat]: value });
      setDisplaySetsDropdown((prev) => !prev);
    };
 */

  return (
  <div>

  </div>
 /*  <VideoUploadForm 
    onDropdownToggleClick={(dropdown) => handlOnDropdownToggleClick(dropdown)}
    onDropdownAlternativeClick={alternative => handleOnDropdownAlternativeClick(alternative)}
  /> */
  )
}
