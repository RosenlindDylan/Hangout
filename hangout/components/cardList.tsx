import { useState, useEffect } from 'react'
import styles from './cardList.module.css'

// function to populate card as a row
const Card = (props) => (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.date}</td>
    </tr>
);

export default function CardList() {
    const [records, setRecords] = useState([]);

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