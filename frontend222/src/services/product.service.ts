import axios from 'axios';
import authHeader, { authHeaderWithFile } from './auth-header';
import IProduct, { IAddProductRequest, ISearchProductRequest, IEditProductRequest } from "../types/product";

const API_URL = 'http://localhost:8080/';

const getAllProductForEveryBody = () => {
  return axios.get<IProduct[]>(API_URL);
};

const getAllProduct = () => {
  return axios.get<IProduct[]>(API_URL + 'product');
};

const infoProduct = (id: any) => {
  return axios.get<IProduct>(API_URL + `product/info/${id}`);
};

const productSearch = (data: ISearchProductRequest) => {
  return axios.post<IProduct[]>(API_URL + 'product/search', data);
};

const addProduct = (data: IAddProductRequest) => {
  return axios.post<IProduct>(API_URL + 'admin/product/add', data, { headers: authHeader() })
    .then((response: any) => {
      console.log(response.data);
      var images = {
        file_one: data.file_one,
        file_two: data.file_two,
        file_three: data.file_three,
        file_four: data.file_four,
        file_five: data.file_five,
      };
      axios.post(API_URL + `admin/product/addImages/${response.data.id}`, images, { headers: authHeaderWithFile() });
    })
    .catch((e: Error) => {
      console.log(e);
    });
};

const editProduct = (id: any, data: IEditProductRequest) => {
  return axios.post<IProduct>(API_URL + `admin/product/edit/${id}`, data, { headers: authHeader() })
    .then((response: any) => {
      console.log(response.data);
      if (data.file_one || data.file_two || data.file_three || data.file_four || data.file_five) {
        var images = {
          file_one: data.file_one,
          file_two: data.file_two,
          file_three: data.file_three,
          file_four: data.file_four,
          file_five: data.file_five,
        };
        return axios.post<IProduct>(API_URL + `admin/product/addImages/${id}`, images, { headers: authHeaderWithFile() });
      }
    })
    .catch((e: Error) => {
      console.log(e);
    });
};

const ProductService = {
  getAllProductForEveryBody,
  getAllProduct,
  infoProduct,
  productSearch,
  addProduct,
  editProduct
};

export default ProductService;