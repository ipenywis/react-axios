import React from "react";

export function Reminder(props) {
  const { reminder, time, id, onDelete } = props;

  return (
    <div className="reminder-wrapper">
      <div className="reminder-container">
        <div className="reminder-id">{id}</div>
        <div className="reminder">{reminder}</div>
        <div className="reminder-time">{time}</div>
      </div>
      <span className="reminder-remove" onClick={() => onDelete(id)}>
        ❌
      </span>
    </div>
  );
}
