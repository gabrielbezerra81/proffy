import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from "./styles";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import TeacherItem, {
  Teacher,
} from "../../shared/components/TeacherItem/TeacherItem";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";
import InputSelect from "../../shared/components/InputSelect/InputSelect";

const TeacherList = () => {
  const [subject, setSubject] = useState("Artes");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const [classes, setClasses] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [isFiltersVisibile, setIsFiltersVisible] = useState(true);

  const [date, setDate] = useState(new Date());
  const [isTimePickerVisibile, setIsTimePickerVisibile] = useState(false);

  const showDatePicker = useCallback(() => {
    setIsTimePickerVisibile(true);
  }, []);

  const hideDatePicker = useCallback(() => {
    setIsTimePickerVisibile(false);
  }, []);

  const handleSelectTime = useCallback((date) => {
    hideDatePicker();
    const selectedDate = new Date(date);
    const selectedTime = selectedDate.getHours().toString().padStart(2, "0");
    const selectedMinute = selectedDate
      .getMinutes()
      .toString()
      .padStart(2, "0");
    setTime(`${selectedTime}:${selectedMinute}`);

    setDate(selectedDate);
  }, []);

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible((visible) => !visible);
  }, []);

  const loadFavorites = useCallback(async () => {
    const response = await AsyncStorage.getItem("favorites");

    if (response) {
      const favoritedTeachers = JSON.parse(response) as Teacher[];
      const favoritedTeachersIds = favoritedTeachers.map(
        (teacher) => teacher.id
      );

      setClasses((oldValue) => oldValue.map((value) => ({ ...value })));
      setFavorites(favoritedTeachersIds);

      console.log("carregou proffys");
    }
  }, [setClasses, setFavorites]);

  const handleFiltersSubmit = useCallback(() => {
    loadFavorites();

    api
      .get<Teacher[]>("classes", { params: { subject, week_day, time } })
      .then((response) => {
        setClasses(response.data);
        setIsFiltersVisible(false);
      })
      .catch(console.log);
  }, [subject, week_day, time, loadFavorites]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersVisibile && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Qual a matéria?"
              value={subject}
              onChangeText={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <InputSelect
                  placeholder="Qual o dia?"
                  value={week_day}
                  onChange={setWeekDay}
                  options={[
                    { label: "Domingo", value: "0" },
                    { label: "Segunda-feira", value: "1" },
                    { label: "Terça-feira", value: "2" },
                    { label: "Quarta-feira", value: "3" },
                    { label: "Quinta-feira", value: "4" },
                    { label: "Sexta-feira", value: "5" },
                    { label: "Sábado", value: "6" },
                  ]}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TouchableWithoutFeedback onPress={showDatePicker}>
                  <View style={styles.input}>
                    <Text style={{ color: time ? "black" : "#c1bccc" }}>
                      {time ? time : "Qual horário?"}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <DateTimePickerModal
                  mode="time"
                  date={date}
                  onCancel={hideDatePicker}
                  onConfirm={handleSelectTime}
                  headerTextIOS="Escolha o horário"
                  confirmTextIOS="Confirmar"
                  cancelTextIOS="Cancelar"
                  isVisible={isTimePickerVisibile}
                  display="spinner"
                  locale="pt_BR"
                  is24Hour
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {classes.map((classItem) => {
          const favorited = favorites.includes(classItem.id);

          return (
            <TeacherItem
              key={classItem.id}
              teacher={classItem}
              favorited={favorited}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
