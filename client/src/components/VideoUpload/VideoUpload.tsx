import React, { ReactElement } from "react";
import Button from "../Shared/Button/Button";
import Container from "../Shared/Container/Container";
import Layout from "../Shared/Layout/Layout";
import buttonStyle from "../Shared/Button/button.module.scss";
interface Props {}

export default function VideoUpload({}: Props): ReactElement {
  return (
    <div className="video-upload">
      <Container>
        <Button
          uniqueStyle={buttonStyle.baseButtonPrimary}
          onClick={(event) => null}
          fullWidth={true}
        >
          Upload Video
        </Button>
      </Container>
    </div>
  );
}
