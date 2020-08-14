import React, { useState, useCallback, FormEvent } from "react";

import PageHeader from "../../shared/components/PageHeader/PageHeader";

import "./styles.css";
import TeacherItem, {
  Teacher,
} from "../../shared/components/TeacherItem/TeacherItem";
import Input from "../../shared/components/Input/Input";
import Select from "../../shared/components/Select/Select";
import api from "../../services/api";

const Teacherlist: React.FC = () => {
  const [subject, setSubject] = useState("Biologia");
  const [week_day, setWeekDay] = useState("3");
  const [time, setTime] = useState("12:00");

  const [classes, setClasses] = useState<Teacher[]>([]);
  

  const handleSearchTeachers = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      api
        .get<Teacher[]>("classes", { params: { subject, week_day, time } })
        .then((response) => {
          const { data } = response;

          setClasses(data);

          console.log(data);
        })
        .catch(() => {
          alert("Falha ao buscar aulas!");
        });
    },
    [subject, week_day, time]
  );

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form onSubmit={handleSearchTeachers} id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.currentTarget.value);
            }}
            options={[
              {
                value: "Artes",
                label: "Artes",
              },
              {
                value: "Biologia",
                label: "Biologia",
              },
              {
                value: "Ciências",
                label: "Ciências",
              },
              {
                value: "Educação física",
                label: "Educação física",
              },
              {
                value: "Física",
                label: "Física",
              },
              {
                value: "Geografia",
                label: "Geografia",
              },
              {
                value: "História",
                label: "História",
              },
              {
                value: "Matemática",
                label: "Matemática",
              },
              {
                value: "Português",
                label: "Português",
              },
              {
                value: "Química",
                label: "Química",
              },
            ]}
          />
          <Select
            name="week_day"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.currentTarget.value);
            }}
            label="Dia da semana"
            options={[
              {
                value: "0",
                label: "Domingo",
              },
              {
                value: "1",
                label: "Segunda-feira",
              },
              {
                value: "2",
                label: "Terça-feira",
              },
              {
                value: "3",
                label: "Quarta-feira",
              },
              {
                value: "4",
                label: "Quinta-feira",
              },
              {
                value: "5",
                label: "Sexta-feira",
              },
              {
                value: "6",
                label: "Sábado",
              },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.currentTarget.value);
            }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {classes.map((classItem) => (
          <TeacherItem key={classItem.id} teacher={classItem} />
        ))}
      </main>
    </div>
  );
};

export default Teacherlist;
