import {useEffect, useState} from "react";

import List from "./List"
import {Spinner} from "react-bootstrap";

function App() {

    const [loading, setLoading] = useState(false)
    const [allDevs, setAllDevs] = useState([])
    const [reload, setReload] = useState(false)
    const [reloadEdit, setReloadEdit] = useState(false)

    console.log("jestem w app component")
    console.log(reload)
    console.log(allDevs)


    const handleRerender = () => {
        setReload(true);
    }

    const handleRerenderEdit = () => {
        setReloadEdit(true);
    }

    useEffect(() => {

        console.log("creating database")
        const createDatabase = async () => {
            const options = {
                method: "POST",
            };
            const result = await fetch("/createDatabase", options);
            console.log(result);
        };
        createDatabase();
    }, []);


    useEffect(() => {
        console.log("pobieram")
            const getDevelopersFunction = async () => {
console.log("poieram II")
                const result = await fetch("getAllDevelopers")
                result.json().then(json => {
                    setAllDevs(json)
                })
                setLoading(true)
                setReload(false)
                setReloadEdit(false)
            }
            getDevelopersFunction();
        }, [reload, reloadEdit]
    )


    return (
        <main>
            <div>developers list</div>
            <div className="container">
                {loading ?
                    <List
                        developers={allDevs}
                        handleRerender = {handleRerender}
                        handleRerenderEdit = {handleRerenderEdit}
                    />
                    : <Spinner animation="border"/>
                }

            </div>
        </main>
    );
}

export default App;
