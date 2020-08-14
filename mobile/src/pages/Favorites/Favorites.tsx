import React, { useCallback, useState } from "react";
import { View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import styles from "./styles";
import PageHeader from "../../shared/components/PageHeader/PageHeader";
import TeacherItem, {
  Teacher,
} from "../../shared/components/TeacherItem/TeacherItem";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  const loadFavorites = useCallback(async () => {
    const response = await AsyncStorage.getItem("favorites");

    if (response) {
      const favoritedTeachers = JSON.parse(response) as Teacher[];

      setFavorites(favoritedTeachers);
      console.log("carregou favoritos");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((favorite) => (
          <TeacherItem key={favorite.id} teacher={favorite} favorited />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
