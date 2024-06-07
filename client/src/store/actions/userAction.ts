import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserDetail, UserInitailState } from "../../types";

export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }: { email: string; password: string }): Promise<UserDetail> => {
    try {
        console.log(`${import.meta.env.VITE_BACKEND_URL}/user`,email,password);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            params: {
                email: email, password:password
            }
        })
        if (response.data.user.length === 0) {
            throw new Error('no data Found')
            
        }
        const user:UserDetail = response.data.user[0];
        // console.log('login user',user);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
})

export const createUser = createAsyncThunk('user/createUser', async ({ name, email, password, address }: { email: string; password: string, name: string; address: string; }):Promise<UserDetail> => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/createUser`, {
            name,email,password,address
        })
        if (response.data.error) {
            throw new Error(response.data.error)
        }
        const user:UserDetail = response.data.user[0];
        console.log('crate users',user);
        return user;
    } catch (error){
        throw new Error(`${error}`);
    }
})
export const changeTheme = createAsyncThunk("user/changeTheme", async (_, { getState }): Promise<{darKMode:boolean}> => {
    const { user } = getState() as {user:UserInitailState};
    const custId = user.data?.custId ;
    // console.log("cust",user);
    

    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/changeMode`, {
            params:{custId}
        })
        // console.log("repsonse",response.data);
        
        if (response.data.error) {
            throw new Error(response.data.error)
        }
        const darkMode = response.data.user[0].darkMode;
        // console.log('darkmode action', response.data);
        return darkMode
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.log(error);
        throw new Error(`${error.message}`);
        } else {
        throw new Error(`${error}`);
            
        }
        
    }
})
