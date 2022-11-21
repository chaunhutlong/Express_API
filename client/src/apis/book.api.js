import httpRequest from "./../services/httpRequest";

export const getAllBook = async () => {
  return httpRequest.get("/books");
};
export const editBooks = async (id, books) => {
  return httpRequest.put("/books/" + id, books);
};
export const createBook = async (books) => {
  return httpRequest.post("/books", books);
};
export const deleteBook = async (id) => {
  return httpRequest.delete("/books/" + id);
};
