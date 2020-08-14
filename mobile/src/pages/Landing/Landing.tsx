import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import landingImage from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

interface ConnectionResponse {
  total: number;
}

const Landing = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  const navigation = useNavigation();

  function handleNavigateToGiveClassesPage() {
    navigation.navigate("GiveClasses");
  }

  function handleNavigateToStudyPages() {
    navigation.navigate("Study");
  }

  useEffect(() => {
    api
      .get<ConnectionResponse>("connections")
      .then((response) => {
        const { data } = response;

        setTotalConnections(data.total);
      })
      .catch(console.log);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {"\n"}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyPages}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{"  "}
        <Image source={heartIcon} style={styles.heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
