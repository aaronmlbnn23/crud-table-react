import create from "zustand";

export const useProperty = create((set, get) => ({
    selectedCoordinates: '',
    applications: [],

    setSelectedCoordinate: (data) => {
        set({selectedCoordinates: data})
    },


    getApplications: async () => {
        
    },


})) 