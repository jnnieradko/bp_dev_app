import {useState} from "react";

const AddModal = ({developer,showModal, handleModalAddClose, rerender}) => {
    console.log("add dev !!")

    console.log(handleModalAddClose)
    console.log(developer)

    const [id, setId] = useState(developer.length+1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [availability, setAvailability] = useState("");
    const [team, setTeam] = useState("");



    const handleSubmit = async (e) => {

        e.preventDefault();
        const addedDeveloper = {
            id: developer.length+1,
            name,
            email,
            role,
            status,
            availability,
            team,
        };

        try {
            const response = await fetch("/addNewDeveloper", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addedDeveloper),
            });
            if (response.ok) {
                handleModalAddClose();
                rerender();
                console.log("New dev added")
            } else {
                console.log("Failed to add developer.");
            }
        } catch (error) {
            console.error(error);
            console.log("Failed to add developer.");
        }
    };

    return (
        <>
            {showModal && (
                <div>
                    <h5 >Add Developer</h5>
                        <form >
                            <div className="form-group">
                                <label htmlFor="name">ID:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={id}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role:</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status:</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="FullTime">FullTime</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Part-Time">Part-Time</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="availability">Availability:</label>
                                <select
                                    id="avalibility"
                                    name="avilibility"
                                    value={availability}
                                    onChange={(e) => setAvailability(e.target.value)}
                                >
                                    <option value="UnAvailable">UnAvailable</option>
                                    <option value="Available">Available</option>
                                    <option value="Temporary UnAviailable">Temporary UnAviailable</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="team">Team:</label>
                                <input
                                    type="text"
                                    id="team"
                                    name="team"
                                    value={team}
                                    onChange={(e) => setTeam(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">

                                <button type="button" onClick={handleSubmit}>
                                    Add
                                </button>
                                <button type="button" onClick={handleModalAddClose}>
                                    Cancel
                                </button>

                           </div>
                        </form>
                </div>
            )}
        </>

    )
}

export default AddModal;