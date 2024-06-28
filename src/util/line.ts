import axios from "axios"
const baseLineUrl = "https://api.line.me";



export const verifyToken = async (accessToken: string) => {
    try {
        const endpoint = `${baseLineUrl}/oauth2/v2.1/verify?access_token=${accessToken}`;
        const response = await axios.get(endpoint);
        return response.data;
    } catch (err: any) {
        console.log(err);
        throw new Error(err.message);
    }
}

export const getUserProfile = async (accessToken: string) => {
    try {
        const endpoint = `${baseLineUrl}/v2/profile?access_token=${accessToken}`;
        const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (err: any) {
        console.log(err);
        throw new Error(err.message);
    }
}