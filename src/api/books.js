import axios from 'axios';


let api = {
  getBooks: function (term, offset, limit) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${term}&&startIndex=${offset}&maxResults=${limit}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  },
  getDetailBook: function (id) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  },

};

export default api;