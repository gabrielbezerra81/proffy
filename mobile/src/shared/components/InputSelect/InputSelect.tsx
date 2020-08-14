import React, { useCallback } from "react";
import { StyleSheet, Platform, TextInput } from "react-native";
import Picker from "react-native-picker-select";
import ModalSelector from "react-native-modal-selector";

type Option = { label: string; value: string };

interface InputSelectProps {
  options: Array<Option>;
  onChange(text: string): void;
  value: string;
  placeholder: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  options,
  onChange,
  value,
  placeholder,
}) => {
  const findLabelByValue = useCallback(() => {
    const option = options.find((optionItem) => optionItem.value === value);

    if (!option) return "";

    return option.label;
  }, [value, options]);

  return Platform.OS === "android" ? (
    <Picker
      value={value}
      style={{
        inputIOS: styles.input,
        inputAndroid: { ...styles.input, color: "#000" },
      }}
      placeholder={{
        label: placeholder,
        color: "#c1bccc",
        value: "",
        displayValue: false,
      }}
      doneText="Ok"
      onValueChange={onChange}
      items={options}
      useNativeAndroidPickerStyle={false}
    />
  ) : (
    <ModalSelector
      touchableActiveOpacity={1}
      data={options.map((option) => ({
        key: option.value,
        label: option.label,
      }))}
      onChange={(option) => onChange(option.key)}
      cancelText="Cancelar"
      backdropPressToClose={true}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        editable={false}
        value={value ? findLabelByValue() : value}
      />
    </ModalSelector>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 54,
    backgroundColor: "#fff",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
});

export default InputSelect;
