import { createContext, useReducer } from "react";
import {
  ADD_EXPENSE,
  SET_EXPENSES,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  expensesReducer,
} from "./expensesReducer";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ id, description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id) => {},
  deleteExpense: (id, { description, amount, date }) => {},
});

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: ADD_EXPENSE, payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: SET_EXPENSES, payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: DELETE_EXPENSE, payload: { id } });
  };

  const updateExpense = (id, data) => {
    dispatch({ type: UPDATE_EXPENSE, payload: { id, data } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
