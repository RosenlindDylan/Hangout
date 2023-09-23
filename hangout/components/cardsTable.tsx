import { useState, useEffect } from "react";

export default function CardsTable() {
    const [card, setCard] = useState([])

    const getCards = async () => {

        try {
            const request = await fetch('../pages/api/getAPI')
            if (request.ok) {
                const jsonData = await request.json();
                setCard(jsonData);
            } else {
            console.error('Failed to fetch data');
            }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        getCards();
    }, [])
    return (
        <div className="cardsTable">
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Time submitted</th>
            </tr>
        </thead>
        <tbody>
            {card.map((card) => (
                <tr key={card._id}>
                    <td>{card.name}</td>
                    <td>{card.date}</td>
                </tr>
            ))}
        </tbody>
        </table>
        </div>
    );
}
