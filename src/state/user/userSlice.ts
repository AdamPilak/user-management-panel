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

interface UsersState {
  loading: boolean;
  users: UserType[];
  error: string;
}

const initialState: UsersState = {
  loading: false,
  users: [],
  error: "",
};

export type UserFilters = {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  sort?: "nameDesc" | "nameAsc" | undefined;
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (options?: UserFilters) => {
    const users: UserType[] = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    ).then((response) => response.json());

    let filteredUsers = users;

    if (options?.name) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.name.toLowerCase().includes(options.name!.toLowerCase());
      });
    }

    if (options?.username) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.username
          .toLowerCase()
          .includes(options.username!.toLowerCase());
      });
    }

    if (options?.email) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.email.toLowerCase().includes(options.email!.toLowerCase());
      });
    }

    if (options?.phone) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.phone.toLowerCase().includes(options.phone!.toLowerCase());
      });
    }

    return filteredUsers;
  }
);

const sortUsers = (sort: string, users: UserType[]) => {
  let sortedUsers = [];

  switch (sort) {
    case "nameDsc": {
      sortedUsers = users.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
  }

  return sortUsers;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default userSlice.reducer;
