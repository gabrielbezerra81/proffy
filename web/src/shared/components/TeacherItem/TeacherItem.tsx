import React, { useRef, useCallback } from "react";

import whatsappIcon from "../../../assets/icons/whatsapp.svg";

import "./styles.css";
import api from "../../../services/api";

export interface Teacher {
  id: string;
  subject: string;
  cost: number;
  user: {
    id: string;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
  };
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const numberFormater = useRef(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  );

  const handleCreateNewConnection = useCallback(() => {
    api.post("connections", { user_id: teacher.user.id }).then().catch();
  }, [teacher]);

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.user.avatar || undefined} alt={teacher.user.name} />

        <div>
          <strong>{teacher.user.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.user.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{numberFormater.current.format(teacher.cost)}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCreateNewConnection}
          href={`https://wa.me/55${teacher.user.whatsapp}`}
          type="button"
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
