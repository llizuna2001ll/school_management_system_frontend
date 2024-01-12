import axios from 'axios';
import {jwtDecode} from "jwt-decode";

class AuthenticationApiService {
    static authenticate = async (authenticationRequest) => {
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/auth/authenticate`, authenticationRequest);
            localStorage.setItem("token",response.data.token);
            const decodedToken = jwtDecode(response.data.token);
            const { userId, authorities, sub } = decodedToken;
            const authority = authorities.length > 0 ? authorities[0].authority : '';

            localStorage.setItem('userId', userId);
            localStorage.setItem('authority', authority);
            localStorage.setItem('username', sub);
            console.log(userId);
            return response.data;

        } catch (error) {
            console.error('Error during authentication:', error);
            throw error;
        }
    };
}

export default AuthenticationApiService;
