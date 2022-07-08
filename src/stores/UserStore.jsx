import create from 'zustand'
import { useNavigate } from 'react-router';
import axios from 'axios';

export const userStore = create((set, get) => ({
  user: [],
  accounts:[],
  accountsToEdit: [],

  setAccountsToEdit: async (user) => {
      set({accountsToEdit: user})
  },

  getUser: async () => {
    const userdata = localStorage.getItem('user');
    if (userdata) {
      const data = JSON.parse(userdata)
      set({ user: data })
    }
    return
  },

 
  logout: async () => {
    const user = get().user;
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }
    try {
      axios.get('http://127.0.0.1:8000/api/logout', {
        headers: headers
      }).then((response) => {
        console.log(response)
        set((state)=> ({
          user: []
       }))
      
      }).finally(()=> {
        localStorage.removeItem('user')
      }).catch((error) => {
        console.log(error)
      })
    } catch (err) {
      console.log(`error: ${err}`)
    }
    return
  },

  fetchAccounts: async () => {
    const user = get().user;
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }
    try {
      axios.get('http://localhost:8000/api/accounts', {
        headers: headers
      }).then((response)=> {
        const data = response.data
        set(({accounts: data}))
      }).finally(()=>{
        const accounts = get().accounts

      })
    } catch (err) {

    }
  },

  updateAccountStatus: async (id) => {
    const user = get().user;
    const fetch = get().fetchAccounts
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }
    try {
      axios.put(`http://localhost:8000/api/update-status/${id}`, {
        headers: headers
      }).then((response)=> {
        const data = response.data
        console.log(data)
      }).finally(()=>{
        fetch()
      })
    } catch (err) {
    }
  },

  deleteAccount: async (id) => {
    const user = get().user;
    const fetch = get().fetchAccounts
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }
    try {
      axios.delete(`http://localhost:8000/api/delete/${id}`, {
        headers: headers
      }).then((response)=> {
        const data = response.data
        console.log(data)
      }).finally(()=>{
        fetch()
      })
    } catch (err) {
    }  
  }, 

  updateAccount: async (id, data) => {
    const user = get().user;
    const fetch = get().fetchAccounts
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }
    
    try {
      axios.put(`http://localhost:8000/api/update-account/${id}`, data, {
        headers: headers
      }).then((response)=> {
        const data = response.data
        console.log(data)
      }).finally(()=>{
        fetch()
      })
    } catch (err) {
    } 
  }
  

}))