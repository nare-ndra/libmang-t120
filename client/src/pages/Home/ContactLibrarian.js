import React from "react";

const ContactLibrarian = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Librarian</h2>
      <p style={styles.paragraph}>
        If you have any questions or need assistance, feel free to contact our
        librarian:
      </p>

      <div style={styles.details}>
        <strong style={styles.label}>Librarian Name:</strong> T120
      </div>
      <div style={styles.details}>
        <strong style={styles.label}>Email:</strong>{" "}
        <a href="mailto:t120@gmail.com" style={styles.link}>
          t120@gmail.com
        </a>
      </div>
      <div style={styles.details}>
        <strong style={styles.label}>Phone:</strong> +123 456 7890
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "auto",
    marginTop: "20px",
    backgroundColor: "#E84545",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold", 
    marginBottom: "16px",
    fontFamily: "Arial, sans-serif", 
  },
  paragraph: {
    color: "white",
    fontSize: "16px",
    marginBottom: "16px",
    lineHeight: "1.5", 
  },
  details: {
    marginBottom: "10px",
    color: "white",
    fontSize: "16px",
  },
  label: {
    fontWeight: "bold",
    marginRight: "5px",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
};

export default ContactLibrarian;
