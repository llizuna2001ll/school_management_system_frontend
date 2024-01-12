import "../styles/admin_home.css"
import ListAltIcon from '@mui/icons-material/ListAlt';
import Groups2Icon from '@mui/icons-material/Groups2';
import Face3Icon from '@mui/icons-material/Face3';
import Face6Icon from '@mui/icons-material/Face6';
import ScienceIcon from '@mui/icons-material/Science';
import Face2Icon from '@mui/icons-material/Face2';
import InfoIcon from '@mui/icons-material/Info';
import {useNavigate} from "react-router-dom";

function AdminHome() {
    const navigate = useNavigate();
    return (
        <>
            <div className={"header"}>
                <h3 className="ms-4 page-title">Student Management System</h3>
                <div className="me-4 user-greeting">{localStorage.getItem("username")}</div>
            </div>
            <div className="features">
                <div className="feature-container">
                    <ListAltIcon sx={{fontSize: 60}}/>
                    <h2>Controles</h2>
                </div>
                <div className="feature-container">
                    <Groups2Icon sx={{fontSize: 60}}/>
                    <h2>Présences</h2>
                </div>
                <div onClick={() => navigate("/etudiants")} className="feature-container">
                    <div className={"d-flex"}><Face6Icon sx={{fontSize: 60}}/>
                        <Face3Icon sx={{fontSize: 60}}/></div>
                    <h2>Etudiants</h2>
                </div>
                <div className="feature-container">
                    <ScienceIcon sx={{fontSize: 60}}/>
                    <h2>Matières</h2>
                </div>
                <div className="feature-container">
                    <Face2Icon sx={{fontSize: 60}}/>
                    <h2>Professeurs</h2>
                </div>
                <div className="feature-container">
                    <InfoIcon sx={{fontSize: 60}}/>
                    <h2>Informations</h2>
                </div>
            </div>
        </>
    )
        ;
}

export default AdminHome;