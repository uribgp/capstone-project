import React, { ReactElement, useRef, useState } from "react";
import { SelectDropdownType } from "../../types/select-dropdown";
import Form from "../Shared/Form/Form";
import SelectDropdown from "../Shared/SelectDropdown/SelectDropdown";
import TitleMedium from "../Shared/Typography/TitleMedium";
import { setsAndRepsValues } from "../../utils/form-values";
import Button from "../Shared/Button/Button";
interface Props {
  onDropdownAlternativeClick: (value: string | number, type: string) => void;
  onDropdownToggleClick: (dropdown: "none" | "reps" | "sets") => void;
}

interface Stats {
  sets: SelectDropdownType;
  reps: SelectDropdownType;
  category: string;
}

export default function VideoUploadForm({
  onDropdownToggleClick,
}: Props): ReactElement {
  return (
    <div>
{/*       <TitleMedium text="How many sets?" />
      <SelectDropdown
        ref={setsRef}
        displayDropdown={() => handleOnDropdownToggle("1")}
        onDropdownAlternativeClick={(value) =>
          onDropdownAlternativeClick(value, "sets")
        }
        onToggleDropdownClick={() => handleOnToggleRepsDropdown()}
        alternatives={setsAndRepsValues}
        selectedAlternative={videoStats.sets}
      />

      <TitleMedium text="How many reps?" />
      <TitleMedium text="Type of lift" />
      <Button onClick={() => null} text="Skip" buttonStyle="primary-outline" />
      <Button onClick={() => null} text="Next" buttonStyle={"primary"} /> */}
    </div>
  );
}
