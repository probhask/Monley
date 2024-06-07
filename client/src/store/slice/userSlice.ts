import { createSlice } from "@reduxjs/toolkit";
import { UserInitailState } from "../../types";
import { checkLocalStorage } from "../../utils/localStorage";
import { changeTheme, createUser, loginUser } from "../actions/userAction";
import toast from "react-hot-toast";



const initialState: UserInitailState = {
  data: checkLocalStorage("data"),
  loginStatus: checkLocalStorage("loginStatus"),
  darkMode: checkLocalStorage("darkMode"),
  isLoading: false,
  isError: "",
};

const userSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("logout caled");
      const ls = checkLocalStorage();
      console.log(ls);
      
      if (ls) {
        const newData = { ...ls, loginStatus: false,darkMode:false };
        console.log("new", newData);
        state.loginStatus = false;
        state.darkMode=false
        localStorage.setItem("monleyUser", JSON.stringify(newData));
        window.location.replace("/login");
      } else {
        toast.error("failed to logout");
      }
    },
    changeThemeOffline: (state) => {
      state.darkMode=!state.darkMode
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { custId, name, darkMode, image, email } = action.payload;
        state.data = action.payload;
        state.darkMode = action.payload.darkMode;
        state.loginStatus = true;
        state.isLoading = false;
        state.isError = "";
        localStorage.setItem(
          "monleyUser",
          JSON.stringify({
            data: { custId, name, image, email },
            darkMode,
            loginStatus: true,
          })
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        action.error.message && toast.error(action.error.message);
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const { custId, name, darkMode, image, email } = action.payload;
        state.data = action.payload;
        state.darkMode = action.payload.darkMode;
        state.loginStatus = true;
        state.isLoading = false;
        state.isError = "";
        localStorage.setItem(
          "monleyUser",
          JSON.stringify({
            data: { custId, name, image, email },
            darkMode,
            loginStatus: true,
          })
        );
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        action.error.message && toast.error(action.error.message);
      });

    builder
      .addCase(changeTheme.fulfilled, (state, action) => {
        // console.log("chnage theme ", action.payload);
        if (typeof action.payload === "boolean") {
          state.darkMode = action.payload;
        }
        const ls = checkLocalStorage();
        if (ls) {
          const newData = { ...ls, darkMode: action.payload };
          localStorage.setItem("monleyUser", JSON.stringify(newData));
        }
      })
      .addCase(changeTheme.rejected, (state, action) => {
        if (action.error.message) {
          toast.error(action.error.message);
        }
      });
  },
});
export const { logout,changeThemeOffline } = userSlice.actions;
export default userSlice.reducer;
