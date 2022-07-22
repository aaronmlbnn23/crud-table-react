import axios from "axios";
import create from "zustand";
import { getApplications, accessToken } from "../Utilities/Utilities";
import { userStore } from "./UserStore";

export const propertyStore = create((set, get) => ({
  selectedCoordinates: '',



  setSelectedCoordinate: (data) => {
    set({ selectedCoordinates: data })
  },

  approveApplication: async (data, token) => {

    const headers = {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
    axios.put(`/approve-application/${data.tdId}`, data, { headers: headers })
    .then((response) => {
      const data = response.data
      console.log(data)
    }).finally(() => {

    })

  },


})) 