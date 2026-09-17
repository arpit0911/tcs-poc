import { createSlice } from "@reduxjs/toolkit";
import type { PresenceBadgeStatus } from "@fluentui/react-components";

interface UserState {
  name: string;
  status: PresenceBadgeStatus;
}

const initialState: UserState = {
  name: "John Doe",
  status: "available",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Add reducers here later to update user info (e.g., login/logout)
  },
});

export default userSlice.reducer;
