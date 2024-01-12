import {useEffect, useState} from "react";
import UserServiceApi from "../../commun/apis/UserServiceApi";
import "../styles/students_style.css"
import {useNavigate} from "react-router-dom";
import GradeServiceApi from "../../commun/apis/GradeServiceApi";
import AddUsersButton from "../components/AddUsersButton";

function Students() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const [selectedGrade, setSelectedGrade] = useState('');
    const [gradeAssigned, setGradeAssigned] = useState('');
    const [grades, setGrades] = useState([]);
    const [email, setEmail] = useState('');
    const [emailAssigned, setEmailAssigned] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserServiceApi.getUsers();
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await GradeServiceApi.getGrades();
                setGrades(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        };
        fetchGrades();
    }, []);


    const handleAssignGrade = async (userId) => {
        try {
            await UserServiceApi.assignGrade(userId, selectedGrade);
            const updatedUsersResponse = await UserServiceApi.getUsers();
            setStudents(updatedUsersResponse.data);
            setGradeAssigned("Grade Assigned to"+ userId)
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    const handleAddEmail = async (username) => {
        if (email !== "") {
            try {
                await UserServiceApi.addEmail(username, email);
                const updatedUsersResponse = await UserServiceApi.getUsers()
                setStudents(updatedUsersResponse.data);
                setEmailAssigned("Email Added to "+username)
            } catch (error) {
                console.error('Authentication error:', error);
            }
        }else {
            setEmailAssigned("Please put an email first")
        }
    };

    const handleGradeChange = (event) => {
        const selectedGradeValue = event.target.value;
        setSelectedGrade(selectedGradeValue);
    };

    return (
        <>
            <div className="header">
                <h3 className="ms-4 page-title">Student Management System</h3>
                <div className="me-4 user-greeting">{localStorage.getItem("username")}</div>
            </div>
            <div className={"students-table"}>
                <AddUsersButton/>
                <table className="table  table-striped students-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Grade</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.username}</td>
                            <td>
                                {student.grade === "N/A" ? (
                                    <td className="text-success table-cursor" data-bs-toggle="modal"
                                        data-bs-target={`#${student.username}`}>
                                        Assign Grade
                                    </td>
                                ) : (
                                    student.grade
                                )}
                            </td>
                            <td>
                                {student.email === null ? (
                                    <td className="text-success table-cursor" data-bs-toggle="modal"
                                        data-bs-target={`#${student.lastName}`}>
                                        Add email
                                    </td>
                                ) : (
                                    student.email
                                )}
                            </td>
                            <td className={"text-primary table-cursor"}
                                onClick={() => navigate(`/students/${student.id}`)}>More
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {students.map(student => (
                    <div className="modal fade" key={student.username} id={student.username} tabIndex="-1"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal Title</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <select className="form-select" aria-label="Select Grade" value={selectedGrade}
                                            onChange={handleGradeChange}>
                                        <option value="" disabled>Select Grade</option>
                                        {grades.map(grade => (
                                            <option key={grade.id} value={grade.name}>
                                                {grade.name}
                                            </option>
                                        ))}
                                    </select>
                                    <p className={"text-success text-center"}>{gradeAssigned}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button onClick={() => handleAssignGrade(student.id)} type="button"
                                            className="btn btn-primary">Attribuer une classe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {students.map(student => (
                    <div className="modal fade" key={student.username} id={student.lastName} tabIndex="-1"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add email for
                                        user {student.lastName}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="email" placeholder="email"
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <p className={"text-success text-center"}>{emailAssigned}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button onClick={() => handleAddEmail(student.username)} type="button"
                                            className="btn btn-primary">Attribuer une classe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
}

export default Students;