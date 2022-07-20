import create from 'zustand'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Navigate } from 'react-router-dom'
import { login, accounts, accessToken, updateStatus, deleteAccount, updateAccount } from '../Utilities/Utilities'



export const userStore = create((set, get) => ({
  user: [],
  accounts: [],
  accountsToEdit: [],
  token: '',
  applications: [],
  
  setAccountsToEdit: async (user) => {
    set({ accountsToEdit: user })
  },


  getUser: async () => {
    const userdata = localStorage.getItem('user');
    if (userdata) {
      const data = JSON.parse(userdata)
      set({ user: data, token: data.token })
    }
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
        set((state) => ({
          user: []
        }))

      }).finally(() => {
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
    const user = await get().user
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'application/json'
    }
    
    axios.get('/accounts', {headers: headers}).then(
      (response) => {
        const data = response.data
        set(({ accounts: data }))
      },
      (error) => {
        console.log(error)
      }
    )
},

fetchApplications: async () => {
  const user = await get().user
  console.log(user)
  const headers = {
    Authorization: `Bearer ${user.token}`,
    'content-type': 'application/json'
  }

  axios.get('/applications', { headers: headers }).then(
    (response) => {
      const data = response.data
      set(({ applications: data }))
      console.log(response.data)
    },
    (error) => {
      console.log(error)
    }
  )
},


  updateAccountStatus: async (id) => {
    const fetch = get().fetchAccounts
      updateStatus(id).then((response) => {
        const data = response.data
        console.log(data)
      }).finally(() => {
        fetch()
      })
   
  },

  deleteAccount: async (id) => {
    const fetch = get().fetchAccounts
      deleteAccount(id).then((response) => {
        const data = response.data
        console.log(data)
      }).finally(() => {
        fetch()
      })
  },

  updateAccount: async (id, data) => {
    const fetch = get().fetchAccounts
    updateAccount(id, data).then((response) => {
        const data = response.data
        console.log(data)
      }).finally(() => {
        fetch()
      })
    }


}))