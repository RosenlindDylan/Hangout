import { useState } from 'react'
import DateComponent from './datecomponent'
import styles from './addForm.module.css'
// import { useNavigate } from 'react-router';


/*
TO DO ON THIS PAGE:

fix react router / set up

*/

export default function addForm() {
    const [form, setForm] = useState({
        name : "",
        date : "",
    })
    // const navigate = useNavigate();

    function updateName(value) {
        return setForm((prev) => {
          return { ...prev, name : value };
        });
    }

    function updateDate(selectedDate) {
      const dateStr = selectedDate.toString().slice(0, 25);
      setForm((prev) => {
        return { ...prev, date: dateStr };
      });
    }

    //db
    async function onSubmit(e) {
        if (form.date.length == 0) {
          console.log('date failed to upload')
        }

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
      <div className={styles.container}>
        <div className={styles.addForm}>
            <form>
                <label>Name: </label>
                <input
                type="text"
                value={form.name} 
                onChange={(e) => updateName(e.target.value)}
                />
            </form>
            <DateComponent onDateChange={updateDate} />
            <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    )
}