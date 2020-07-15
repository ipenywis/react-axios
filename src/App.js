import React, { useState, useEffect } from "react";
import "./App.css";

import { axios } from "./axios";
import { Reminder } from "./components/reminder";

function App() {
  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState({});

  const noReminder = !reminders || (reminders && reminders.length === 0);

  const getReminders = async () => {
    const response = await axios.get("/reminders").catch((err) => {
      console.log("Error:", err);
    });
    if (response && response.data) {
      setReminders(response.data);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const addReminder = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await axios.post("/reminders", formData).catch((err) => {
      console.log("Error: ", err);
    });

    if (response) await getReminders();

    setFormData({});
  };

  const deleteReminder = async (id) => {
    const response = await axios.delete(`/reminders/${id}`).catch((err) => {
      console.log("Error deleting: ", err);
    });

    if (response) await getReminders();
  };

  //OnComponentDidMount lifecycle
  useEffect(() => {
    getReminders();
  }, []);

  return (
    <div className="App">
      <h3>Reminders</h3>
      {!noReminder &&
        reminders.map((reminder, idx) => (
          <Reminder key={idx} {...reminder} onDelete={deleteReminder} />
        ))}
      <br />
      <h3>Add Reminder</h3>
      <form onSubmit={addReminder}>
        <label htmlFor="id">Id</label>
        <input name="id" placeholder="Id" onChange={handleChange} />
        <label htmlFor="reminder">Reminder</label>
        <input name="reminder" placeholder="Reminder" onChange={handleChange} />
        <label htmlFor="time">Time</label>
        <input name="time" placeholder="Time" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
