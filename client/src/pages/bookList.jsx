import { useState, useEffect } from "react";
import { getAllBook } from "./../apis/book.api";
function BookList() {
  const [books, setBooks] = useState([]);
  const getData = async () => {
    const res = await getAllBook();
    console.log(res);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1>This is the BookList page</h1>
    </div>
  );
}

export default BookList;
