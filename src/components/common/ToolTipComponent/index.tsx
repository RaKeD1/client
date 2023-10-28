import React, { ReactElement, useEffect, useState } from "react";
import styles from "./ToolTipComponent.module.scss";
import css from "classnames";

type PropsType = {
  children?: ReactElement;
  type: string;
  message: string;
};

const ToolTipComponent: React.FC<PropsType> = ({ children, type, message }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, [type]);
  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 6000);
  }, [type]);
  const renderElAlert = function () {
    if (children) {
      return React.cloneElement(children);
    }
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    setIsShow(false);
  };

  return (
    <div className={css(styles.alert, styles[type], !isShow && styles.hide)}>
      <span className={styles.closebtn} onClick={handleClose}>
        &times;
      </span>
      {children ? renderElAlert() : message}
    </div>
  );
};

export default ToolTipComponent;
