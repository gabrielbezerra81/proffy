import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

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
  const [time, setTime] = useState("12:00");

  const [classes, setClasses] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [isFiltersVisibile, setIsFiltersVisible] = useState(true);

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
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Qual horário"
                  value={time}
                  onChangeText={setTime}
                ></TextInput>
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

// const DayPickerIOS = () => {
//   <ModalSelector
//     initValue="Qual o dia?"
//     style={styles.input}
//     data={[
//       { label: "Domingo", key: "0" },
//       { label: "Segunda-feira", key: "1" },
//       { label: "Terça-feira", key: "2" },
//       { label: "Quarta-feira", key: "3" },
//       { label: "Quinta-feira", key: "4" },
//       { label: "Sexta-feira", key: "5" },
//       { label: "Sábado", key: "6" },
//     ]}
//     onChange={(option) => setWeekDay(option.label)}
//   >
//     <TextInput value={week_day} placeholder="Qual o dia?" editable={false} />
//   </ModalSelector>;
// };

export default TeacherList;
