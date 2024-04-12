import axios from "axios";

const url = import.meta.env.VITE_API_URL;
export const apiHelper = {
    signup: async (email, name, password) => {
        // Password must have at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long
        const response = await axios.post(`${url}/auth/signup`, {
            email, name, password
        });
        const body = response.data
        if (response.status !== 200) {
            return { error: body.error }
        }
        return body.authToken;
    },
    login: async (email, password) => {
        // Password must have at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long
        const response = await axios.post(`${url}/auth/login`, {
            email, password
        });
        const body = response.data
        if (response.status !== 200) {
            return { error: body.error }
        }
        return body.authToken;
    },
    getUser: async (token) => {
        const response = await axios.get(`${url}/auth/getuser`, {
            headers: {
                "auth-token": token
            }
        });
        const body = response.data
        if (response.status !== 200) {
            return { error: body.error }
        }
        return body.user;
    }
}