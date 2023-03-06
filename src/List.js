import { useState } from "react";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

const List = ({ developers, handleRerender, handleRerenderEdit }) => {
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    console.log(selectedDeveloper)
    console.log(developers)

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleEditClick = (developer) => {
        console.log(developer)
        setSelectedDeveloper(developer);
        setShowEditModal(true);
    };

    const handleModalEditClose = () => {
        setShowEditModal(false);
    };

    const handleModalAddClose = () => {
        setShowAddModal(false);
        //setShowEditModal(false);
    };

    return (
        <>
            <div>
                <button onClick={handleAddClick}>Add developer</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Availability</th>
                    <th>Team</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {developers.map((developer) => (
                    <tr key={developer.id}>
                        <td>{developer.id}</td>
                        <td>{developer.name}</td>
                        <td>{developer.email}</td>
                        <td>{developer.role}</td>
                        <td>{developer.status}</td>
                        <td>{developer.avilability}</td>
                        <td>{developer.team}</td>
                        <td>
                            <button onClick={() => handleEditClick(developer)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedDeveloper && (
                <EditModal
                    developer={selectedDeveloper}
                    showModal={showEditModal}
                    handleModalEditClose = {handleModalEditClose}
                    handleRerenderEdit = {handleRerenderEdit}
                />
            )}
            {showAddModal && (
                <AddModal
                    developer={developers}
                    showModal={showAddModal}
                    handleModalAddClose={handleModalAddClose}
                    rerender = {handleRerender}
                />
            )}
        </>
    );
};

export default List;