import {useState} from "react";

import "../styles/login_style.css";
import AuthenticationApiService from "../apis/AuthenticationApiService";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [error, setError] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            const authenticationRequest = {
                username,
                password,
            };

            try {
                 await AuthenticationApiService.authenticate(authenticationRequest);
                 navigate("/");
            } catch (error) {
                console.error('Authentication error:', error);
                setError(error);
            }
        }
        else{
            setError("Merci de remplir tous les champs");
        }
    };


    return (
        <div className={"login_container"}>
            <div className={"login_form_container"}>
                <div className={"left"}>
                    <form className={"form_container"} onSubmit={handleSubmit}>
                        <h1>Se connecter</h1>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className={"input"}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className={"input"}
                        />
                        {error && <div className={"error_msg"}>{error}</div>}
                        <button type="submit" className={"green_btn"}>
                            Sing In
                        </button>
                    </form>
                </div>
                <div className={"right"}>
                    <img src={"./images/login/ImgL.png"} className={"imagelogin"}/>
                    <h1>Bienvenue</h1>

                </div>
            </div>
        </div>
    );
};

export default Login;