import API from './api';

export const createOrder = async (orderData) => {
  const response = await API.post('/orders', orderData);
  return response.data;
};

export const fetchOrderByNumber = async (orderNumber) => {
  const response = await API.get(`/orders/${orderNumber}`);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await API.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (id, statusData) => {
  const response = await API.put(`/orders/${id}`, statusData);
  return response.data;
};
