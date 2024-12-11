export const ADD_EXPENSE = "ADD_EXPENSE";
export const SET_EXPENSES = "SET_EXPENSES";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";

export const expensesReducer = (state, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [action.payload, ...state];
    case SET_EXPENSES:
      const iverted = action.payload.reverse();
      return iverted;
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
