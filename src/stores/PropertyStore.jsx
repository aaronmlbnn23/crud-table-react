import axios from "axios";
import create from "zustand";
import { getApplications, accessToken } from "../Utilities/Utilities";
import { userStore } from "./UserStore";

export const propertyStore = create((set, get) => ({
  selectedCoordinates: '',
  


  setSelectedCoordinate: (data) => {
    set({ selectedCoordinates: data })
  },


 

})) 