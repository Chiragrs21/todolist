import React from "react"
import { useState } from "react"
import Notecontext from "../context/notecontext"
const Statecontext = (props) => {

    const notesinstial = []
    const [state, setstate] = useState(notesinstial)

    const getallnote = async () => {
        const url = "http://localhost:5000/api/note/getnotebook"
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmQ5Nzg3NDM1MDRiYTYxNjgwZjBkOCIsImlhdCI6MTY5NzUzMzQ4NX0.BRcNZFjZ76BnDYngMhlINClWurzYzzW9--PGbONN4Uc"
            },
        });
        const json = await response.json();

        setstate(json)

    }

    const addnote = async (title, Description, Tag) => {
        console.log({ title, Description, Tag })
        const url = "http://localhost:5000/api/note/data"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmQ5Nzg3NDM1MDRiYTYxNjgwZjBkOCIsImlhdCI6MTY5NzUzMzQ4NX0.BRcNZFjZ76BnDYngMhlINClWurzYzzW9--PGbONN4Uc"
            },
            body: JSON.stringify({ title, Description, Tag }),
        });
        const json = await response.json();

        setstate(state.concat(json))
    }

    const deletenote = async (id) => {
        const url = `http://localhost:5000/api/note/delete/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmQ5Nzg3NDM1MDRiYTYxNjgwZjBkOCIsImlhdCI6MTY5NzUzMzQ4NX0.BRcNZFjZ76BnDYngMhlINClWurzYzzW9--PGbONN4Uc"
            },
        });
        const json = await response.json();
        console.log(json)

        const newnote = state.filter((state) => {
            return id !== state._id
        })

        setstate(newnote)
    }

    const editnote = async (title, discription, tag, id) => {
        const url = `http://localhost:5000/api/note/updatethings/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmQ5Nzg3NDM1MDRiYTYxNjgwZjBkOCIsImlhdCI6MTY5NzUzMzQ4NX0.BRcNZFjZ76BnDYngMhlINClWurzYzzW9--PGbONN4Uc"
            },
            body: JSON.stringify({ title, discription, tag }),
        });
        const json = await response.json();

        let newele = JSON.parse(JSON.stringify(state))

        for (let index = 0; index < newele.length; index++) {
            let element = newele[index]

            if (element._id === id) {

                newele[index].title = title
                newele[index].Description = discription
                newele[index].Tag = tag
                console.log(newele[index])
                break;
            }
        }
        setstate(newele)



    }

    return (
        <Notecontext.Provider value={{ state, setstate, addnote, deletenote, editnote, getallnote }}>
            {props.children}
        </Notecontext.Provider>
    )

}

export default Statecontext;
