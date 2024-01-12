import axios from 'axios';

class GradeServiceApi {
    static getGrades = async () => {
        const baseUrl = 'http://localhost:8888/api/v1/grades';
        const token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await axios.get(baseUrl, {headers});
        console.log(response);
        return response;
    }
}

export default GradeServiceApi;