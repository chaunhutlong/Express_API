import { useEffect, useState } from "react";
import { createBook, editBooks } from "../../apis/book.api";
import Modal from "./Modal";
const initValues = {
  isbn: "",
  title: "",
  author: "",
  numOfPages: "",
  publish_date: "",
  publisher: "",
};
const ModalBook = ({ handleClose, isOpen, data, refetchAfterSubmit }) => {
  const [values, setValues] = useState(initValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data === null) {
        await createBook(values);
      } else {
        await editBooks(data?.id, values);
      }
      refetchAfterSubmit();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setValues(
      data
        ? {
            isbn: data.isbn,
            title: data.title,
            author: data.author,
            numOfPages: data.numOfPages,
            publish_date: data.publish_date,
            publisher: data.publisher,
          }
        : initValues
    );
  }, [data, isOpen]);
  return (
    <Modal handleClose={() => handleClose()} isOpen={isOpen}>
      <div className="px-5 pt-2 pb-4">
        <h1 className="font-semibold ">
          {data === null ? "Tạo sách" : "Chỉnh sửa sách"}
        </h1>
        <div className="card">
          <form onSubmit={handleSubmit} className="card-form">
            <div className="container-card">
              <div className="input">
                <input
                  name="isbn"
                  onChange={handleChange}
                  value={values.isbn}
                  type="text"
                  className="input-field"
                  required
                />
                <label className="input-label">IsBn</label>
              </div>
              <div className="input">
                <input
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                  type="text"
                  className="input-field"
                  required
                />
                <label className="input-label">Title</label>
              </div>
              <div className="input">
                <input
                  name="author"
                  onChange={handleChange}
                  value={values.author}
                  type="text"
                  className="input-field"
                  required
                />
                <label className="input-label">Author</label>
              </div>
              <div className="input">
                <input
                  name="numOfPages"
                  onChange={handleChange}
                  value={values.numOfPages}
                  type="text"
                  className="input-field"
                  required
                />
                <label className="input-label">NumOfPages</label>
              </div>
              <div className="input">
                <input
                  name="publish_date"
                  onChange={handleChange}
                  value={values.publish_date}
                  type="text"
                  className="input-field"
                  required
                />
                <label className="input-label">PublishDate</label>
              </div>{" "}
              <div className="input">
                <input
                  name="publisher"
                  onChange={handleChange}
                  value={values.publisher}
                  type="text"
                  className="input-field"
                  required
                />
                <label className="input-label">Publisher</label>
              </div>
            </div>

            <div className="action">
              <button type="submit" className="action-button">
                Tạo
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBook;
