import React, { useState } from "react";

interface AddQuoteFormProps {
  onQuoteAdded: () => void;
}

const AddQuoteForm: React.FC<AddQuoteFormProps> = ({ onQuoteAdded }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          author,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedQuote = await response.json();
      console.log("Quote added:", addedQuote);

      // Reset input fields
      setText("");
      setAuthor("");

      // Notify parent to refresh quotes
      onQuoteAdded();
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4 mt-4 bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
    >
      <input
        type="text"
        placeholder="Quote text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full p-2 border rounded-lg"
      />
      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
      >
        Add Quote
      </button>
    </form>
  );
};

export default AddQuoteForm;
