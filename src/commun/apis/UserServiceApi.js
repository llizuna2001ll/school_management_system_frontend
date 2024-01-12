import axios from 'axios';

class UserServiceApi {
    static getUsers = async () => {
        const baseUrl = 'http://localhost:8888/api/v1/users';
        const token = localStorage.getItem("token");

        // Set the Authorization header
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(baseUrl, {headers});
        console.log(response);
        return response;
    }

    static getUser = async (userId) => {
        const baseUrl = `http://localhost:8888/api/v1/users/${userId}`;
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(baseUrl, {headers});
        console.log(response);
        return response;
    }

    static assignGrade = async (userId, grade) => {
        const baseUrl = `http://localhost:8888/api/v1/users/${userId}/assignGrade?grade=${grade}`;
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return await axios.put(baseUrl, null, {headers});
    }

    static addEmail = async (username, email) => {
        const baseUrl = `http://localhost:8888/api/v1/users/addEmail`;
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return await axios.post(baseUrl, {username, email}, {headers});
    }

    static addEmail = async (firstName, lastName, password, birthDate, birthPlace, address, phoneNumber, sexe, grade, email) => {
        const baseUrl = `http://localhost:8888/api/v1/users/addUser`;
        const token = localStorage.getItem("token");
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    console.log(firstName)
        return await axios.post(baseUrl, {
            user: firstName
        }, {headers});
    }


}

export default UserServiceApi;