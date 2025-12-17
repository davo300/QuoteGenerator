import { Routes, Route } from "react-router-dom";
import QuoteGenerator from "./QuoteGenerator";
import AddQuoteForm from "./AddQuoteForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuoteGenerator />} />
      <Route path="/add" element={<AddQuoteForm />} />
    </Routes>
  );
}

export default App;
