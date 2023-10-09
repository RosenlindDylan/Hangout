import { useState, useEffect } from 'react'
import styles from './cardList.module.css'

interface Record {
  _id: string; // Define the type for _id property
  name: string;
  date: string;
}


// function to populate card as a row
const Card = (props) => (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.date}</td>
      <td>
        <button className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
          >
          Delete
        </button>
      </td>
    </tr>
);

export default function CardList() {
    const [records, setRecords] = useState<Record[]>([]);

    // gets cards from db
    useEffect(() => {
        async function getRecords() {
          try {
            const response = await fetch(`http://localhost:5050/record/`);
    
            if (!response.ok) {
              throw new Error(`An error occurred: ${response.statusText}`);
            }
    
            const records = await response.json();
            setRecords(records);
          } catch (error) {
            setRecords([]); // Clear records in case of an error
          }
        }
    
        getRecords();
    }, []);


    async function deleteRecord(id) {
      await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE"
      });
    
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    }

    function recordList() {    
        if (records.length === 0) {
          // Display a message when there are no records
          return (
            <tr>
              <td>No records found in the database.</td>
            </tr>
          );
        } else {
            return records.map((record) => {
                return (
                  <Card
                      record={record}
                      deleteRecord={() => deleteRecord(record._id)}
                      key={record._id}
                  />
                );
              });
        }
    }

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Suggested Date</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}