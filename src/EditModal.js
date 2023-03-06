import { useState } from "react";

const EditModal = ({ developer, showModal, handleModalEditClose, handleRerenderEdit }) => {

    console.log(developer)

    console.log(developer.name)

    const [name, setName] = useState(developer.name);
    const [email, setEmail] = useState(developer.email);
    const [role, setRole] = useState(developer.role);
    const [status, setStatus] = useState(developer.status);
    const [availability, setAvailability] = useState(developer.availability);
    const [team, setTeam] = useState(developer.team);

    console.log(name)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedDeveloper = {
            id: developer.id,
            name,
            email,
            role,
            status,
            availability,
            team,
        };

        console.log(updatedDeveloper)

        // Send PUT request to server to update the developer's details
        const response = await fetch(`/developer/${developer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDeveloper),
        });
        console.log(response)
        if (response.ok) {
            handleModalEditClose();
            handleRerenderEdit();
        } else {
            console.log("Failed to update developer");
        }
    };

    return (
        <>
            {showModal && (
                <div>
                    <h2>Edit Developer</h2>
                    <form>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            Role:
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                className="form-control"
                                id="avalibility"
                                name="avilibility"
                                value={availability}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">FullTime</option>
                                <option value="Active">Contract</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </label>
                        <label>
                            Availability:
                            <select
                                className="form-control"
                                id="avalibility"
                                name="avilibility"
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                            >
                                <option value="">UnAvailable</option>
                                <option value="Active">Available</option>
                                <option value="Inactive">Temporary UnAviailable</option>
                            </select>
                        </label>
                        <label>
                            Team:
                            <input
                                type="text"
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                            />
                        </label>
                        <button type="button" onClick={handleSubmit}>
                            Done
                        </button>
                        <button type="button" onClick={handleModalEditClose}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditModal;


