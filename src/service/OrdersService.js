import apiClient from './apiClient';

export class OrdersService{

    // Fetch all orders

    fetchAllOrders(){
        return apiClient.get('/orders')
      .then(response => response.data);
    }

    createNewOrder(data){
      return apiClient.post('/orders',data)
      .then(response => response.data);
    }
}