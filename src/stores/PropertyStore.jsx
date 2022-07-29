import axios from "axios";
import create from "zustand";
import { getApplications, accessToken } from "../Utilities/Utilities";
import { userStore } from "./UserStore";

export const propertyStore = create((set, get) => ({
  selectedCoordinates: '',
  loading: true,
  myProperty: [],
  properties: [],
  message: '',
  status: '',
  dataPoints: [],
  propertyData: [],

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

  fetchProperties: async (token) => {
    const properties = await get().properties
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    try {
      set((state) => ({ loading: true }));
      axios
        .get("/properties", { headers: headers })
        .then((response) => {
          const data = response.data;
          set({ properties: data })
        })
        .then(() => {

          set((state) => ({ loading: false }));

        });
    } catch (error) {
      console.log(error);
    }
  },

  fetchGeomap: async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    try {
      set((state) => ({ loading: true }));
      axios
        .get("/geomap", { headers: headers })
        .then((response) => {
          const data = response.data;
          set({ propertyData: data })
        })
        .then(() => {

          set((state) => ({ loading: false }));

        });
    } catch (error) {
      console.log(error);
    }
  },
  getDatapointsInfo: async (token, datapoints) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    try {
      set((state) => ({ loading: true }));
      axios
        .get(`/getDatapoints-info/${datapoints}`, { headers: headers })
        .then((response) => {
          const data = response.data;
          set({ dataPointsInfo: data })
        })
        .then(() => {

          set((state) => ({ loading: false }));

        });
    } catch (error) {
      console.log(error);
    }
  },

  deleteProperty: async (id, token) => {

    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    axios
      .delete(`/delete-property/${id}`, { headers: headers })
      .then((response) => {
        const data = response.data;
        console.log(data);
        set((state) => ({
          properties: state.properties.filter((property) => property.id !== id),
        }));
      })
      .finally(() => {
        set({ message: "Property deleted successfully." });
        set({ status: 'success' });

        setTimeout(() => {
          set((state) => ({ message: "" }));
          set((state) => ({ status: 'error' }));
        }, 2500);
      });
  },

})) 