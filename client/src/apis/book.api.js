import httpRequest from "./../services/httpRequest";

export const getAllBook = async () => {
  return httpRequest.get("/books");
};
