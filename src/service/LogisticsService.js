import apiClient from './apiClient';

export class LogisticsService{

    // Fetch all drivers
    fetchAllDrivers(){
        return apiClient.get('/drivers')
      .then(response => response.data);
    }
    createDriver(data){
      return apiClient.post('/drivers',data)
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
    editDriver(data,id){
      return apiClient.put(`/drivers/${id}`,data)
      .then(response => response.data);
    }
    deleteDriver(id){
      return apiClient.delete(`/drivers/${id}`)
      .then(response => response.data);
    }

    fetchAllVehiclesList(data){
      return apiClient.get('logistics/vehicles/list',data)
      .then(response => response.data);
    }
    fetchDriverById(data ){
      return apiClient.get(`/drivers/${data}`,data)
      .then(response => response.data);
    }
    
}