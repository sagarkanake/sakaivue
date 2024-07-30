import apiClient from './apiClient';

export class OrdersService{

    // Fetch all orders

    fetchAllOrders(){
        return apiClient.get('/orders')
      .then(response => response.data);
    }
}