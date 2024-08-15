import apiClient from './apiClient';

export class LogisticsService{

    // Fetch all drivers
    fetchAllDrivers(){
        return apiClient.get('https://jsonplaceholder.typicode.com/users')
      .then(response => response.data);
    }
    fetchAllVehicles(){
      return apiClient.get('/logistics/vehicles')
    .then(response => response.data);
  }

    createNewOrder(data){
      return apiClient.post('/orders',data)
      .then(response => response.data);
    }

    fetchAllVehiclesList(data){
      return apiClient.get('logistics/vehicles/list',data)
      .then(response => response.data);
    }
    
}