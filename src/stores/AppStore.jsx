import create from "zustand";
import axios from "axios";
export const appStore = create((set, get) => ({
  loading: true,
  application: [],
  applications: [],

  sendingStatus: false,
  sendingMessage: "",

  setSendingMessage: (message) => {
    set({ sendingMessage: message });
  },
  setSendingStatus: (status) => {
    set((state) => ({ sendingStatus: status }));
  },

  fetchApplication: async (id, token) => {
    const application = await get().application;
    const loading = await get().loading;
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    try {
      set((state) => ({ loading: true }));
      axios
        .get(`/application/${id}`, { headers: headers })
        .then((response) => {
          const data = response.data;
          set({ application: data });
        })
        .then(() => {
          set((state) => ({ loading: false }));
          //console.log(loading);
        });
    } catch (error) {
      console.log(error);
    }
  },

  fetchApplications: async (token) => {
    const loader = await get().loading;
    const user = await get().user;
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    try {
      set((state) => ({ loading: true }));

      axios.get("/applications", { headers: headers }).then(
        (response) => {
          const data = response.data;
          set({ applications: data });
          set((state) => ({ loading: false }));
          //console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  approveApplication: async (data, token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    axios
      .put(`/approve-application/${data.tdId}`, data, { headers: headers })
      .then((response) => {
        const data = response.data;
        console.log(data);
        set((state) => ({
          application: {
            ...state.application,
            status: data.status,
          },
        }));
      })
      .finally(() => {
        set((state) => ({ sendingMessage: "Approved successfully." }));
        set((state) => ({ sendingStatus: "sucsess" }));

        setTimeout(() => {
          set((state) => ({
            sendingMessage: "",
          }));
          set((state) => ({
            sendingStatus: false,
          }));
        }, 2500);
      });
  },

  rejectApplication: async (data, token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    axios
      .put(`/reject-application/${data.tdId}`, data, { headers: headers })
      .then((response) => {
        const data = response.data;
        console.log(data);
        set((state) => ({
          application: {
            ...state.application,
            status: data.status,
          },
        }));
      })
      .finally(() => {
        set((state) => ({ sendingMessage: "Rejected successfully." }));
        set((state) => ({ sendingStatus: "sucsess" }));

        setTimeout(() => {
          set((state) => ({
            sendingMessage: "",
          }));
          set((state) => ({
            sendingStatus: false,
          }));
        }, 2500);
      });
  },

  revertApplication: async (data, token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    };
    axios
      .put(`/revert-application/${data.tdId}`, data, { headers: headers })
      .then((response) => {
        const data = response.data;
        console.log(data);
        set((state) => ({
          application: {
            ...state.application,
            status: data.status,
          },
        }));
      })
      .finally(() => {
        set((state) => ({ sendingMessage: "Reverted successfully." }));
        set((state) => ({ sendingStatus: "sucsess" }));

        setTimeout(() => {
          set((state) => ({
            sendingMessage: "",
          }));
          set((state) => ({
            sendingStatus: false,
          }));
        }, 2500);
      });
  },
}));
