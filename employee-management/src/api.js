import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getEmployees = () => axios.get(`${API_URL}/employees`);
export const addEmployee = (employee) => axios.post(`${API_URL}/employees`, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/employees/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}`);
