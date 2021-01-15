import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Button from "../Shared/Button/Button";
import HeroContainerWidth from "./HeroContainerWidth";
import ContainerWidthHeroContainer from "./HeroContainerWidth";
import textStyles from "../../styles/typography.module.scss";
import InfoCardStep from "./InfoCardStep";
import Container from "../Shared/Container/Container";
import buttonStyles from "../Shared/Button/button.module.scss";
import './index-container.style.scss'
interface Props {}

export default function IndexContainer({}: Props): ReactElement {
  console.log(buttonStyles);
  return (
    <div className="home">
      <HeroContainerWidth>
        <div className="home-hero-container-width--content">
          <h1 className="home-hero-container-width--title">Getting feedback on your workouts has never been easier</h1>
          <Link
            className={` ${buttonStyles.baseButtonPrimary} ${buttonStyles.baseButton}`}
            to="/videos"
          >
            Watch Videos
          </Link>
          <Link
            className={` ${buttonStyles.baseButtonPrimaryOutlineWhite} ${buttonStyles.baseButton}`}
            to="/sign-up"
          >
            Sign up
          </Link>
        </div>
      </HeroContainerWidth>
      <Container>
        <div>How it works</div>
        <InfoCardStep
          stepNumber="1"
          title="Film Yourself Working Out"
          text="lorem"
        />

        <InfoCardStep stepNumber="2" title="Upload Your Video" text="Lorem" />
        <InfoCardStep stepNumber="3" title="Get feedback" text="Lorem" />
      </Container>
    </div>
  );
}
