import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "New Shoes",
    amount: 99.99,
    date: new Date("2021-7-14"),
  },
  {
    id: "e2",
    description: "New Shirt",
    amount: 49.99,
    date: new Date("2021-7-15"),
  },
  {
    id: "e3",
    description: "New Pants",
    amount: 69.99,
    date: new Date("2022-7-16"),
  },
  {
    id: "e4",
    description: "New Hat",
    amount: 29.99,
    date: new Date("2023-7-17"),
  },
  {
    id: "e5",
    description: "Surfing Flow House",
    amount: 50,
    date: new Date("2024-12-1"),
  },
  {
    id: "e6",
    description: "Swimming",
    amount: 70,
    date: new Date("2024-11-7"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id) => {},
  deleteExpense: (id, { description, amount, date }) => {},
});

export const ADD_EXPENSE = "ADD_EXPENSE";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";

const expensesReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case UPDATE_EXPENSE:
      return state.map((expense) =>
        expense.id === action.payload.id
          ? {
              ...expense,
              ...action.payload.data,
            }
          : expense
      );
    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: ADD_EXPENSE, payload: expenseData });
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
