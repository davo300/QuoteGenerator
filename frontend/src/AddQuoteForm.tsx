import { useState } from "react";
import { Link } from "react-router-dom";

const AddQuoteForm = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setStatus("Quote text is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          author,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add quote");
      }

      setText("");
      setAuthor("");
      setStatus("Quote added successfully ✅");
    } catch (err) {
      setStatus("Error adding quote ❌");
    }
  };

  return (
    <div className="quote-container">
      {/* App title */}
      <h1 className="quote-title">Quote App</h1>
  
      {/* Navigation */}
      <div className="quote-nav">
        <Link to="/">View Quotes</Link>
        <Link to="/add">Add Quote</Link>
      </div>
  
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "2rem", width: "100%", maxWidth: "500px" }}>
        <h2>Add a Quote</h2>
  
        <textarea
          placeholder="Quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
  
        <input
          type="text"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
  
        <button type="submit">Add Quote</button>
  
        {status && <p>{status}</p>}
      </form>
    </div>
  );
  
};

export default AddQuoteForm;
