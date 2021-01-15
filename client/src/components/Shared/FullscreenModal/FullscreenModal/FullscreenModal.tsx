import React, { ReactElement } from "react";
import { IoMdClose } from "react-icons/io";
import { Modal } from "../../../../portal/Portal";
import ButtonIcon from "../../Button/ButtonIcon";
import "./fullscreen-modal.style.scss";
interface Props {
  onCloseClick: () => void;
  onOutsideClick?: () => void;
  children: React.ReactNode;
  backgroundType: "transparent" | "white";
}

export default function FullscrenModal ({
  onOutsideClick,
  onCloseClick,
  children,
  backgroundType,
}: Props): ReactElement {
  return (
    <Modal>
      <div
        onClick={onOutsideClick}
        className={`fullscreen-modal ${
          backgroundType === "transparent"
          ? "fullscreen-modal-transparent"
          : "fullscreen-modal-white"
        }`}
      >
        <ButtonIcon className="fullscreen-modal--close-button"  onClick={() => onCloseClick()} icon={<IoMdClose />} />
        <div
          onClick={(event) => event.stopPropagation()}
          className="fullscreen-modal-content-wrap"
        >
          {children}
        </div>
      </div>
    </Modal>
  );
}
