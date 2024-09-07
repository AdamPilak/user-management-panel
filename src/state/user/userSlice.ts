import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type UserFilters = {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
};

interface UserState {
  loading: boolean;
  users: UserType[];
  error: string;
  filters: UserFilters;
  sort: "nameDesc" | "nameAsc";
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: "",
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  sort: "nameDesc",
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (filters: UserFilters) => {
    const users: UserType[] = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((response) => response.json());

    const filteredUsers = filterUsers(users, filters);

    return filteredUsers;
  }
);

const filterUsers = (users: UserType[], filters: UserFilters) => {
  let filteredUsers = users;

  if (filters.name) {
    filteredUsers = filteredUsers.filter((user) => {
      return user.name.toLowerCase().includes(filters.name!.toLowerCase());
    });
  }

  if (filters.username) {
    users = users.filter((user) => {
      return user.username
        .toLowerCase()
        .includes(filters.username!.toLowerCase());
    });
  }

  if (filters.email) {
    filteredUsers = filteredUsers.filter((user) => {
      return user.email.toLowerCase().includes(filters.email!.toLowerCase());
    });
  }

  if (filters.phone) {
    filteredUsers = filteredUsers.filter((user) => {
      return user.phone.toLowerCase().includes(filters.phone!.toLowerCase());
    });
  }

  return filteredUsers;
};

const sortUsers = (state: UserState) => {
  if (state.sort === "nameDesc") {
    state.users.sort((a, b) => (a.name > b.name ? 1 : -1));
  } else {
    state.users.sort((a, b) => (a.name < b.name ? 1 : -1));
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSort: (state) => {
      state.sort === "nameDesc"
        ? (state.sort = "nameAsc")
        : (state.sort = "nameDesc");

      sortUsers(state);
    },
    setFilters: (
      state,
      action: PayloadAction<{ label: string; value: string }>
    ) => {
      switch (action.payload.label) {
        case "name":
          state.filters.name = action.payload.value;
          break;
        case "username":
          state.filters.username = action.payload.value;
          break;
        case "email":
          state.filters.email = action.payload.value;
          break;
        case "phone":
          state.filters.phone = action.payload.value;
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        sortUsers(state);
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { toggleSort, setFilters } = userSlice.actions;

export default userSlice.reducer;
