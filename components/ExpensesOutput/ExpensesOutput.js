import { View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {expenses?.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: GlobalStyles.colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
