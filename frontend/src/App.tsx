import React, { useState } from "react";
import QuoteGenerator from "./QuoteGenerator";
import AddQuoteForm from "./AddQuoteForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleQuoteAdded = () => {
    setRefreshKey((prev) => prev + 1); // trigger QuoteGenerator to reload
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700">Quote App</h1>
      <QuoteGenerator key={refreshKey} />
      <AddQuoteForm onQuoteAdded={handleQuoteAdded} />
    </div>
  );
}

export default App;
