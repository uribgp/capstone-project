import React, { ReactElement, ReactNode } from "react";
import Container from "../Shared/Container/Container";
import "./hero-container-width.style.scss";
interface Props {
  children: ReactNode;
}

export default function HeroContainerWidth({ children }: Props): ReactElement {


  return (
    <div className="hero-container-width">
      <Container>
        <div
          className="hero-container-width--background"
          style={{
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%), url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80')`,
          }}
        >
          <div className="hero-container-width--text-content">{children}</div>
        </div>
      </Container>
    </div>
  );
}
