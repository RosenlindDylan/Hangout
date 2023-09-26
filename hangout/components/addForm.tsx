import { useState } from 'react'
import DateComponent from './datecomponent'
// import { useNavigate } from 'react-router';


/*
TO DO ON THIS PAGE:

parser for datetime - not inserting correctly
css for component
fix react router / set up

*/

export default function addForm() {
    const [form, setForm] = useState({
        name : "",
        date : "",
    })
    // const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, name : value };
        });
    }

    //db
    async function onSubmit(e) {
        e.preventDefault();
        const newForm = { ...form };
        
        await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newForm),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
        
        console.log('successfully submitted: \n Name: ', form.name,' \n Date: ', form.date);
        setForm({ name: "", date: "" });
        // navigate("/");
    }

    // gonna have to redo the css later too
    return (
        <div>
            <form>
                <label>Name: </label>
                <input
                type="text"
                value={form.name} 
                onChange={(e) => updateForm(e.target.value)}
                />
            </form>
            <DateComponent />
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}