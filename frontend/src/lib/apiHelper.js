import axios from "axios";

const url = import.meta.env.VITE_API_URL;
export const apiHelper = {
    signup: async ({email, username, password, startTime, endTime, genre, rank, interestedGames }) => {
        // Password must have at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long
        const response = await axios.post(`${url}/auth/signup`, {
            email, username, password, startTime, endTime, genre, rank, interestedGames
        });
        const body = response.data
        if (response.status !== 200 || response.data.error) {
            return { error: body.error }
        }
        return body.authToken;
    },
    login: async ({username, password}) => {
        // Password must have at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long
        const response = await axios.post(`${url}/auth/login`, {
            username, password
        });
        const body = response.data
        if (response.status !== 200 || response.data.error || response.data.error) {
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
        if (response.status !== 200 || response.data.error) {
            return { error: body.error }
        }
        return body.user;
    },
    getUserById: async (token, id) => {
        const response = await axios.get(`${url}/auth/user/${id}`, {
            headers: {
                "auth-token": token
            }
        });
        const body = response.data
        if (response.status !== 200 || response.data.error) {
            return { error: body.error }
        }
        return body.user;
    },
    dynamicSearch: async (searchTerm) => {
        const response = await axios.get(`${url}/games/search?term=${searchTerm}`);
        const body = response.data
        if (response.status !== 200 || response.data.error) {
            return { error: body.error }
        }
        return body;
    },
    searchUsers: async (searchTerm) => {
        const response = await axios.get(`${url}/auth/search?term=${searchTerm}`);
        const body = response.data
        if (response.status !== 200 || response.data.error) {
            return { error: body.error }
        }
        return body;
    },
    fetchGames: async (page = 1) => {
        try {
            const apiKey = import.meta.env.VITE_API_KEY
            const response = await axios.get(
                `https://api.rawg.io/api/games?key=${apiKey}&page=${page}`
            );
            return response.data;
        } catch (error) {
            console.log("error in rawg api getting game list: "+error)
            return {error: error.message}
        }
    },
    fetchGameData: async (id) => {
        if(!id)return {error: "invalid id"}
        try {
            const apiKey = import.meta.env.VITE_API_KEY
            const response = await axios.get(
                `https://api.rawg.io/api/games/${id}?key=${apiKey}`,
                {
                    validateStatus: function (status) {
                        return status < 400; 
                    }
                }
            );
            if(!response)return {error: "no response"}
            return response.data;
        } catch (error) {
            console.log("error in rawg api getting game details: "+error)
            return {error: error.message}
        }
    },
    fetchMyFavGames: async (games) => {
        const apiKey = import.meta.env.VITE_API_KEY
        if(!apiKey)return {error: "no api key!"}
        for(const game of games){
            console.log(game)
            const gameData = await axios.get(
                `https://api.rawg.io/api/games/${game}?key=${apiKey}`
            );
            games.push(gameData.data)
        }
        return games;
    },
}