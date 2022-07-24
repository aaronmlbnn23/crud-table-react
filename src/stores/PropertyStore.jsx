import axios from "axios";
import create from "zustand";
import { getApplications, accessToken } from "../Utilities/Utilities";
import { userStore } from "./UserStore";

export const propertyStore = create((set, get) => ({
  selectedCoordinates: '',
  loading: true,
  myProperty: [],


  setSelectedCoordinate: (data) => {
    set({ selectedCoordinates: data })

  },




  fetchMyProperty: async (id, token) => {

    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
    try {
      set((state) => ({ loading: true }))
      axios.get(`/my-property/${id}`, { headers: headers }).then(
        (response) => {
          const data = response.data
          set(({ myProperty: data }))
          
          console.log(response.data)
        }
      ).then(() => {
        set((state) => ({ loading: false }))
      })
    } catch (error) {
      console.log(error)
      set((state) => ({ loading: false }))
    }

  },

})) 