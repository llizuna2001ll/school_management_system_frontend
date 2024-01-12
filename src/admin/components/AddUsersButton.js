import React, { useState, useEffect } from 'react';
import UserServiceApi from '../../commun/apis/UserServiceApi';
import GradeServiceApi from '../../commun/apis/GradeServiceApi';

function AddUsersButton() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [sexe, setSexe] = useState('');
    const [grade, setGrade] = useState('');
    const [email, setEmail] = useState('');
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await GradeServiceApi.getGrades();
                setGrades(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        };
        fetchGrades();
    }, []);

    const handleAddUser = async () => {
        try {
            await UserServiceApi.addEmail({
                firstName,
                lastName,
                password,
                birthDate,
                birthPlace,
                address,
                phoneNumber,
                sexe,
                grade,
                email,
            });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <>
            <button
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
                className="btn btn-success fw-bolder mb-5"
            >
                Add Student
            </button>

            <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            placeholder="Prénom"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            placeholder="Nom"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="phonenumber"
                            placeholder="Téléphone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            aria-label="Select Grade"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        >
                            <option value="" disabled>
                                Select Grade
                            </option>
                            {grades.map((grade) => (
                                <option key={grade.id} value={grade.name}>
                                    {grade.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            aria-label="Select Grade"
                            value={sexe}
                            onChange={(e) => setSexe(e.target.value)}
                            name="sexe"
                        >
                            <option value="" disabled>
                                Select Sexe
                            </option>
                            <option value={"MALE"}>MALE</option>
                            <option value={"FEMALE"}>FEMELLE</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="addresse"
                            placeholder="Addresse"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="birthdate"
                            placeholder="DD/MM/YYYY"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="birthdate"
                            placeholder="Lieu de naissance (Ville)"
                            value={birthPlace}
                            onChange={(e) => setBirthPlace(e.target.value)}
                        />
                    </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddUsersButton;