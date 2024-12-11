import { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";

import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";

const ExpenseForm = ({
  submitButtonLabel,
  defaultValues,
  onCancel,
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true, // We are not validating the input here, it will be done on submit
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) =>
    setInputs((crrentInputValues) => ({
      ...crrentInputValues,
      [inputIdentifier]: { value: enteredValue, isValid: true }, // We are not validating the input here, it will be done on submit
    }));

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setInputs((currentInputValues) => ({
        amount: {
          value: currentInputValues.amount.value,
          isValid: isAmountValid,
        },
        date: { value: currentInputValues.date.value, isValid: isDateValid },
        description: {
          value: currentInputValues.description.value,
          isValid: isDescriptionValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const isFormValid = Object.values(inputs).every((input) => input.isValid);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          isInvalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (amount) => inputChangeHandler("amount", amount),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          isInvalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (date) => inputChangeHandler("date", date),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        isInvalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (description) =>
            inputChangeHandler("description", description),
          value: inputs.description.value,
        }}
      />
      {!isFormValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
