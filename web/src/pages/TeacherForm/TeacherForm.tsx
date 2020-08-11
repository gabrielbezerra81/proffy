import React, { useState, useCallback, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../shared/components/PageHeader/PageHeader";
import Input from "../../shared/components/Input/Input";
import "./styles.css";
import warningIcon from "../../assets/icons/warning.svg";
import Textarea from "../../shared/components/Textarea/Textarea";
import Select from "../../shared/components/Select/Select";
import api from "../../services/api";

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: "", from: "", to: "" },
  ]);

  const [userData, setUserData] = useState({
    name: "",
    avatar: "",
    whatsapp: "",
    bio: "",
  });

  const [classData, setClassData] = useState({
    subject: "",
    cost: "",
  });

  const addNewScheduleItem = useCallback(() => {
    setScheduleItems((oldValue) => [
      ...oldValue,
      { week_day: "", from: "", to: "" },
    ]);
  }, []);

  const changeUserData = useCallback((e) => {
    const { name, value } = e.currentTarget;

    setUserData((oldValue) => ({
      ...oldValue,
      [name]: value,
    }));
  }, []);

  const changeClassData = useCallback((e) => {
    const { name, value } = e.currentTarget;

    setClassData((oldValue) => ({
      ...oldValue,
      [name]: value,
    }));
  }, []);

  const changeScheduleItem = useCallback(
    (position: number, field: string, value: string) => {
      setScheduleItems((oldValues) =>
        oldValues.map((scheduleItem, index) => {
          if (index === position) {
            return { ...scheduleItem, [field]: value };
          }

          return { ...scheduleItem };
        })
      );
    },
    []
  );

  const handleCreateClass = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const schedule = scheduleItems.map((schedule) => ({
        ...schedule,
        week_day: Number(schedule.week_day),
      }));

      const requestData = {
        ...userData,
        ...classData,
        cost: Number(classData.cost),
        schedule,
      };

      api
        .post("classes", requestData)
        .then((response) => {
          alert("Cadastro realizado com sucesso!");
          history.push("/");
        })
        .catch(() => {
          alert("Erro no cadastro!");
        });
    },
    [userData, classData, scheduleItems, history]
  );

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={userData.name}
              onChange={changeUserData}
            />
            <Input name="avatar" label="Avatar" onChange={changeUserData} />
            <Input name="whatsapp" label="Whatsapp" onChange={changeUserData} />
            <Textarea name="bio" label="Biografia" onChange={changeUserData} />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
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
              value={classData.subject}
              onChange={changeClassData}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={classData.cost}
              onChange={changeClassData}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={index}>
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={(e) => {
                    const { name, value } = e.currentTarget;

                    changeScheduleItem(index, name, value);
                  }}
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
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) => {
                    const { name, value } = e.currentTarget;

                    changeScheduleItem(index, name, value);
                  }}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) => {
                    const { name, value } = e.currentTarget;

                    changeScheduleItem(index, name, value);
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
