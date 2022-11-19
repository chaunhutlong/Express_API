import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookList from "./pages/bookList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default App;
