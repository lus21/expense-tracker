import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlay = ({ message, onConfirm }) => (
  <View style={styles.container}>
    <Text style={[styles.text, styles.title]}>An error occurred!</Text>
    <Text style={[styles.text, styles.description]}>{message}</Text>
    <Button onPress={onConfirm} style={styles.button}>
      Okay
    </Button>
  </View>
);

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.secondary200,
  },
  text: {
    textAlign: "center",
    marginBotttom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    marginTop: 4,
    marginBottom: 16,
  },
  button: {
    minWidth: 100,
  },
});
