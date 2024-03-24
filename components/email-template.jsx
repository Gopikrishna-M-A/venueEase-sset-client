import React from "react";

const EmailTemplate = ({ user, status, reservation, message }) => {
  return (
    <div>
      <p>Dear {reservation.userId.name},</p>

      <p>
        This email serves to update the status of your venue reservation request
        for the event <strong>{reservation.eventName}</strong> at{" "}
        <strong>{reservation.venueId.venueName}</strong>.<br />Your status has been
        updated to:
      </p>

      <p>
        <strong>Status:</strong> {status}
        <br />
        {message && (
          <>
            <strong>Reason:</strong> {message}
            <br />
          </>
        )}
        <strong>Reservation Dates:</strong>{" "}
        {new Date(reservation.reservationDate[0]).toLocaleDateString()} to{" "}
        {new Date(reservation.reservationDate[1]).toLocaleDateString()}
      </p>

      <p>
        Please contact us if you have any questions or require further
        assistance.
      </p>

      <p>Sincerely,</p>
      <p style={{ textDecoration: "none", marginRight: "10px" }}>
        The Venue Reservation Team
      </p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* LinkedIn logo link */}
        <a href="https://www.linkedin.com/in/gopikrishna6003">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            alt="LinkedIn"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
        </a>

        {/* GitHub logo link */}
        <a href="https://github.com/Gopikrishna-M-A">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            style={{ width: "30px", height: "30px" }}
          />
        </a>
      </div>
    </div>
  );
};

export default EmailTemplate;
