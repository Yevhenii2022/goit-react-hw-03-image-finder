import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const config = {
  params: {
    key: '30581837-c45b098a0a9f83c61371df16c',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

export async function searchImages(query, page = 1) {
  try {
    const urlAXIOS = `?page=${page}&q=${query}`;
    const { data } = await axios.get(urlAXIOS, config);
    return data;
  } catch (error) {
    console.log(error);
  }
}
