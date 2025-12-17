import React, { useState, useEffect } from "react"; // react
import "./QuoteGenerator.css";
import { Link } from "react-router-dom";


<div className="quote-nav">
  <Link to="/">View Quotes</Link>
  <Link to="/add">Add Quote</Link>
</div>

interface Quote {
  id: number;
  text: string;
  author?: string;
}

const QuoteGenerator: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/quotes");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  const handleNextQuote = () => {
    if (quotes.length > 0) {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }
  };

  if (quotes.length === 0) {
    return <p>Loading quotes...</p>;
  }

  return (
    <div className="quote-container">
      <h1 className="quote-title">Quote App</h1>
  
      <div className="quote-nav">
        <Link to="/">View Quotes</Link>
        <Link to="/add">Add Quote</Link>
      </div>
  
      <p className="quote-text">
        “{quotes[index].text}” — {quotes[index].author || "Unknown"}
      </p>
  
      <button className="quote-button" onClick={handleNextQuote}>
        Next Quote ➡️
      </button>
    </div>
  );
  

  
  
};

export default QuoteGenerator;
