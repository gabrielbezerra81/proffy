import React from "react";
import { Link } from "react-router-dom";

import logoImage from "../../../assets/logo.svg";
import backIcon from "../../../assets/icons/back.svg";

import "./styles.css";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  description,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/" className="">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImage} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>

        {!!description && <p>{description}</p>}

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
