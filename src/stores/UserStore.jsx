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
  application: [],
  loading: true,

  setAccountsToEdit: async (user) => {
    set({ accountsToEdit: user })
  },

  setLoading: () => {
    set((state) => ({ loading: false }))
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
      set((state) => ({ loading: true }))
      axios.get('http://127.0.0.1:8000/api/logout', {
        headers: headers
      }).then((response) => {
        console.log(response)
        set((state) => ({
          user: []
        }))
        set((state) => ({ loading: false }))

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
    const loading = await get().loading
    const user = await get().user
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'application/json'
    }
    try {
      set((state) => ({ loading: true }))
      console.log(loading)
      axios.get('/accounts', { headers: headers }).then(
        (response) => {
          const data = response.data
          set(({ accounts: data }))
          set((state) => ({ loading: false }))

        },
        (error) => {
          console.log(error)
        }
      )
    } catch (error) {
      console.log(error)
    }

  },

  fetchApplications: async () => {
    const loader = await get().loading
    const user = await get().user
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'application/json'
    }
    try {
      set((state) => ({ loading: true }))

      axios.get('/applications', { headers: headers }).then(
        (response) => {
          const data = response.data
          set(({ applications: data }))
          set((state) => ({ loading: false }))
          console.log(response.data)
        },
        (error) => {
          console.log(error)
        }
      )
    } catch (error) {
      console.log(error)
    }

  },

  fetchApplication: async (id) => {
    const loading = await get().loading
    const user = await get().user
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'application/json'
    }
    try {
      set((state) => ({loading: true}))
      axios.get(`/application/${id}`, { headers: headers }).then(
        (response) => {
          const data = response.data
          set(({ application: data }))
          console.log(response.data)
          set((state) => ({loading: false}))
        },
        (error) => {
          console.log(error)
        }
      )
    } catch (error) {
      console.log(error)
    }

  },


  updateAccountStatus: async (id) => {
    const fetch = get().fetchAccounts
    const user = await get().user
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'application/json'
    }
    axios.put(`/update-status/${id}`, { headers: headers }).then((response) => {
      const data = response.data
      console.log(data)
    }).finally(() => {
      fetch()
    })

  },

  deleteAccount: async (id) => {
    const fetch = get().fetchAccounts
    const user = await get().user
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'application/json'
    }
    axios.delete(`/delete-account/${id}`, { headers: headers }).then((response) => {
      const data = response.data
      console.log(data)
    }).finally(() => {
      fetch()
    })
  },

  updateAccount: async (id, data) => {
    const fetch = get().fetchAccounts
    const user = await get().user
    const headers = {
      Authorization: `Bearer ${user.token}`,
      'content-type': 'application/json'
    }

    axios.put(`/update-account/${id}`, data, { headers: headers }).then((response) => {
      const data = response.data
      console.log(data)
    }).finally(() => {
      fetch()
    })
  }


}))