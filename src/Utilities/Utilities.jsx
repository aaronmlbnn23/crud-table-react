import axios from 'axios'
import { userStore } from '../stores/UserStore'


const user = JSON.parse(window.localStorage.getItem('user'))
const getAccessToken = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if(!user || undefined) return false 
  return user.token
}

const getAllUserData = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
    if(!user || undefined) return false 
    return user
}

export const userData = getAllUserData();
export const accessToken = getAccessToken();


axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';


//User / Accounts Utilities
export const login = ({email, password}) => axios.post(`/login?email=${email}&password=${password}`) 
export const accounts = () => axios.get('/accounts');
export const updateStatus = (id) => axios.put(`/update-status/${id}`) 
export const deleteAccount = (id) => axios.delete(`/delete-account/${id}`)
export const updateAccount = (id, data) => axios.put(`/update-account/${id}`, data)


//Property Utilities
export const getApplications = () => axios.get('/applications')


//higher order function to catch errors
export const catchErrors = fn => {
    return function(...args) {
      return fn(...args).catch((err) => {
        console.error(err);
      })
    }
  }