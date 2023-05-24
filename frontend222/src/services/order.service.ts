import axios from 'axios';
import authHeader from './auth-header';
import IOrder, {IUpdateOrderStatusRequest, ISearchOrderRequest} from "../types/order"

const API_URL = 'http://localhost:8080/';

const orderUser = () => {
  return axios.get<IOrder[]>(API_URL + 'orders', { headers: authHeader() });
};

const order = () => {
  return axios.get<IOrder[]>(API_URL + 'order/create', { headers: authHeader() });
};

//связанные с заказами для админа:
const adminOrders = () => {
    return axios.get<IOrder[]>(API_URL + 'admin/orders', { headers: authHeader() });
};

const orderSearch = (search: ISearchOrderRequest) => {
    return axios.post<IOrder[]>(API_URL + 'admin/orders/search', search, { headers: authHeader() });
};

const editOrderStatus = (id: any, status: IUpdateOrderStatusRequest) => {
    return axios.post<IOrder[]>(API_URL + `admin/orders/edit/${id}`, status, { headers: authHeader() });
};

const OrderService = {
  orderUser,
  order,
  adminOrders,
  orderSearch,
  editOrderStatus,
}

export default OrderService;