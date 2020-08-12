import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import giveClassesBgImage from "../../assets/images/give-classes-background.png";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const GiveClasses = () => {
  const navigation = useNavigation();

  function handleNavigationBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>

        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Text>
      </ImageBackground>
      <RectButton style={styles.okayButton} onPress={handleNavigationBack}>
        <Text style={styles.okayButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
};

export default GiveClasses;
