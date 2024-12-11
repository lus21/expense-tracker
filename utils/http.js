import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);

  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses.json`);

  const expenses = [];
  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(`${API_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
};
