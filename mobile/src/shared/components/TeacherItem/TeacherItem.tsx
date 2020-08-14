import React, { useRef, useCallback, useState, useEffect } from "react";
import { View, Image, Text, Linking } from "react-native";
import { NumberFormat } from "intl";
import "intl/locale-data/jsonp/pt-BR";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";

import heartOutlineIcon from "../../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../../assets/images/icons/whatsapp.png";
import undefinedProfilePicture from "../../../assets/images/undefinedProfilePicture.png";
import api from "../../../services/api";
import { useFocusEffect } from "@react-navigation/native";

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
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const numberFormater = useRef(
    new NumberFormat("pt-BR", { minimumFractionDigits: 2 })
  ).current;

  const [isFavorited, setIsFavorited] = useState(favorited);

  const handleLinkToWhatsapp = useCallback(() => {
    api.post("connections", { user_id: teacher.user.id });

    Linking.openURL(`https://wa.me/55${teacher.user.whatsapp}`);
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoritesArray: Teacher[] = [];
    if (favorites) favoritesArray = JSON.parse(favorites);

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex(
        (teacherItem) => teacherItem.id === teacher.id
      );

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } //
    else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }, [isFavorited]);

  const checkIsFavorited = useCallback(async () => {
    const response = await AsyncStorage.getItem("favorites");

    if (response) {
      const favoritedTeachers = JSON.parse(response) as Teacher[];
      const favoritedTeachersIds = favoritedTeachers.map(
        (teacher) => teacher.id
      );

      const check = favoritedTeachersIds.includes(teacher.id);

      setIsFavorited(check);
    }
  }, [favorited, isFavorited, teacher]);

  useFocusEffect(
    useCallback(() => {
      checkIsFavorited();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={
            !!teacher.user.avatar
              ? {
                  uri: teacher.user.avatar,
                }
              : undefinedProfilePicture
          }
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.user.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.user.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora{"   "}
          <Text style={styles.priceValue}>
            R$ {numberFormater.format(teacher.cost)}
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
            onPress={handleToggleFavorite}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
