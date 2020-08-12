import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import PageHeader from "../../shared/components/PageHeader/PageHeader";

const TeacherList = () => {
  return (
    <View style={styles.container}>
      <PageHeader title="Proffys disponíveis" />
    </View>
  );
};

export default TeacherList;