import React, { useState } from "react";

export default function AddCard() {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (name && time) {
        try {
          let response = await fetch("http://localhost:3000/api/insertAPI", {
            method: "POST",
            body: JSON.stringify({
              name,
              time,
            }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          });
          response = await response.json();
          setName("");
          setTime("");
          setError("");
          setMessage("Post added successfully");
        } catch (errorMessage: any) {
          setError(errorMessage);
        }
      } else {
        return setError("All fields are required");
      }
    };
  }
  