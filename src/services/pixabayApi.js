import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

//https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12

const fetchImages = ({ query = '', page = 1, per_page = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
    )
    .then(response => response.data)
    .then(data => data.hits);
};

export { fetchImages };
