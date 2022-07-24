import create from "zustand";
import { useNavigate } from "react-router";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  login,
  accounts,
  accessToken,
  updateStatus,
  deleteAccount,
  updateAccount,
} from "../Utilities/Utilities";

export const userStore = create((set, get) => ({
  user: [],
  accounts: [],
  accountsToEdit: [],
  token: "",
  applications: [],
  application: [],
  loading: true,
  message: "",
  status: false,
  isAddModalOpen: false,

  toggleAddModal: () => {
    set((state) => ({ isAddModalOpen: !state.isAddModalOpen }));
  },

  setAccountsToEdit: async (user) => {
    set({ accountsToEdit: user });
  },

  setLoading: () => {
    set((state) => ({ loading: false }));
  },

  getUser: async () => {
    const userdata = localStorage.getItem("user");
    if (userdata) {
      const data = JSON.parse(userdata);
      set({ user: data, token: data.token });
    }
  },

  logout: async () => {
    const user = get().user;
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    try {
      set((state) => ({ loading: true }));
      axios
        .get("http://127.0.0.1:8000/api/logout", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);
          set((state) => ({
            user: [],
          }));
          set((state) => ({ loading: false }));
        })
        .finally(() => {
          localStorage.removeItem("user");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(`error: ${err}`);
    }
    return;
  },

  fetchAccounts: async () => {
    const loading = await get().loading;
    const user = await get().user;
    const accounts = await get().accounts;
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    };
    try {
      set((state) => ({ loading: true }));
      axios
        .get("/accounts", { headers: headers })
        .then((response) => {
          const data = response.data;

          const { id, name, status, role, email } = response.data;
          set((state) => ({
            accounts: data.map((account) => ({
              id: account.id,
              name: account.name,
              email: account.email,
              role: account.role,
              status: account.status,
            })),
          }));
        })
        .then(() => {
          set((state) => ({ loading: false }));
          console.log(accounts);
        });
    } catch (error) {
      console.log(error);
    }
  },

  addAccount: async (data) => {
    const accounts = await get().accounts;
    const user = await get().user;
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    };
    axios
      .post("/register", data, { headers: headers })
      .then((response) => {
        const res = response.data;
        console.log(res);
        set((state) => ({
          accounts: [...state.accounts, { 
            id: res.id,
            email: res.email,
            name: res.name,
            role: res.role,
            status: res.status
           }],
        }));
      })
      .finally(() => {
        console.log(accounts);
        set({ isAddModalOpen: false });
        set({ message: "Account added successfully." });
        set({ status: true });

        setTimeout(() => {
          set((state) => ({ message: "" }));
          set((state) => ({ status: false }));
        }, 2000);
      });
  },

  updateAccountStatus: async (id) => {
    const fetch = get().fetchAccounts;
    const user = await get().user;
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    };
    axios
      .put(`/update-status/${id}`, { headers: headers })
      .then((response) => {
        const data = response.data;
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === id ? { ...account, status: data.status } : account
          ),
        }));
      })
      .finally(() => {
        set({ message: "Account status updated successfully." });
        set({ status: true });

        setTimeout(() => {
          set((state) => ({ message: "" }));
          set((state) => ({ status: false }));
        }, 2000);
      });
  },

  deleteAccount: async (id) => {
    const fetch = get().fetchAccounts;
    const user = await get().user;
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    };
    axios
      .delete(`/delete-account/${id}`, { headers: headers })
      .then((response) => {
        const data = response.data;
        console.log(data);
        set((state) => ({
          accounts: state.accounts.filter((account) => account.id !== id),
        }));
      })
      .finally(() => {
        set({ message: "Account deleted successfully." });
        set({ status: true });

        setTimeout(() => {
          set((state) => ({ message: "" }));
          set((state) => ({ status: false }));
        }, 2500);
      });
  },

  updateAccount: async (id, data) => {
    const fetch = get().fetchAccounts;
    const user = await get().user;
    const headers = {
      Authorization: `Bearer ${user.token}`,
      "content-type": "application/json",
    };

    axios
      .put(`/update-account/${id}`, data, { headers: headers })
      .then((response) => {
        const data = response.data;
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.id === id
              ? { ...account, name: data.name, email: data.email }
              : account
          ),
        }));
      })
      .finally(() => {
        set({ message: "Account updated successfully." });
        set({ status: true });

        setTimeout(() => {
          set((state) => ({ message: "" }));
          set((state) => ({ status: false }));
        }, 2500);
      });
  },
}));
