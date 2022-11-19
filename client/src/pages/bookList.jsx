import { useState, useEffect } from "react";
import { deleteBook, getAllBook } from "./../apis/book.api";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "../components/Modal/Modal";
import ModalBook from "../components/Modal/ModalBook";
function BookList() {
  const [books, setBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const getData = async () => {
    const res = await getAllBook();
    console.log(res);
    setBooks(res);
  };
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      await getData();
    } catch (error) {
      console.error(error);
    }
  };
  const renderBooks = () => {
    return books?.map((book, index) => {
      return (
        <div key={index} className="grid grid-cols-7">
          <div className="px-2 py-4 border-y-[1px]">{book.isbn}</div>
          <div className="px-2 py-4 border-y-[1px]">{book.title}</div>
          <div className="px-2 py-4 border-y-[1px]">{book.author}</div>
          <div className="px-2 py-4 border-y-[1px]">{book.numOfPages}</div>
          <div className="px-2 py-4 border-y-[1px]">{book.publish_date}</div>
          <div className="px-2 py-4 border-y-[1px]">{book.publisher}</div>
          <div className="px-2 py-4 border-y-[1px] flex gap-x-2 justify-center items-center">
            <div
              onClick={() => setIsOpen({ data: book })}
              className="p-3 rounded-full bg-green-300 w-fit h-fit cursor-pointer"
            >
              <AiFillEdit />
            </div>
            <div
              onClick={() => {
                handleDeleteBook(book?.id);
              }}
              className="p-3 rounded-full bg-red-300 w-fit h-fit cursor-pointer"
            >
              <AiFillDelete />
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold underline py-8 text-center">
        BookManagement
      </h1>
      <div
        className="flex justify-end mb-4 max-w-[1080px] mx-auto "
        onClick={() => setIsOpen({ data: null })}
      >
        <button className="bg-blue-200 rounded-lg px-4 py-2">
          Create book
        </button>
      </div>
      {books && books?.length > 0 ? (
        <div className="text-center flex flex-col mt-5 max-w-[1080px] mx-auto rounded-lg overflow-hidden bg-white ">
          <div className="grid grid-cols-7 font-semibold">
            <div className="px-2 py-4 bg-blue-200">Isbn</div>
            <div className="px-2 py-4 bg-blue-200">Title</div>
            <div className="px-2 py-4 bg-blue-200">Author</div>
            <div className="px-2 py-4 bg-blue-200">NumOfPage</div>
            <div className="px-2 py-4 bg-blue-200">PublishDate</div>
            <div className="px-2 py-4 bg-blue-200">Publisher</div>
            <div className="px-2 py-4 bg-blue-200">Action</div>
          </div>
          {renderBooks()}
        </div>
      ) : (
        <div>There are no books in the list</div>
      )}

      <ModalBook
        handleClose={() => setIsOpen(null)}
        isOpen={!!isOpen}
        data={isOpen?.data}
        refetchAfterSubmit={getData}
      />
    </div>
  );
}

export default BookList;
