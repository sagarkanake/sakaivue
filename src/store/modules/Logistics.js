import axios from 'axios';
import { LogisticsService } from '../../service/LogisticsService';

export default {
  namespaced: true,
  state: () => ({
    data: null,
    loading: false,
    error: null,
    vehicles_data: null,
    vehicles_loading: false,
    vehicles_error: null,
  }),
  mutations: {
    FETCH_DATA_REQUEST(state) {
      state.loading = true;
      state.error = null;
    },
    FETCH_DATA_SUCCESS(state, data) {
      state.loading = false;
      state.data = data;
    },
    FETCH_DATA_FAILURE(state, error) {
      state.loading = false;
      state.error = error;
    },
    FETCH_DATA_VEHICLES_REQUEST(state) {
      state.vehicles_loading = true;
      state.vehicles_error = null;
    },
    FETCH_DATA_VEHICLES_SUCCESS(state, data) {
      state.vehicles_loading = false;
      state.vehicles_data = data;
    },
    FETCH_DATA_VEHICLES_FAILURE(state, error) {
      state.vehicles_loading = false;
      state.vehicles_error = error;
    },
  },
  actions: {
    
    async fetchVehiclesData({ commit }) {
      commit('FETCH_DATA_VEHICLES_REQUEST');
      try {
      
        const data = await new LogisticsService().fetchAllVehicles();
        // const data = await response.json();
        console.log('Data fetched:', data);
        commit('FETCH_DATA_VEHICLES_SUCCESS',  data.map(user => ({
            id: user.id,
            name: user.name,
            phone_number: user.phone,
            type: 'own',
            vehicles: 'KAX 200K',
            code_of_conduct: 'Valid',
            driver_license: 'Expired',
            food_handling_certificates: 'Expired',
        })));
      } catch (error) {
        commit('FETCH_DATA_VEHICLES_FAILURE', error.message);
      }
    },
    async fetchDriversData({ commit }) {
      commit('FETCH_DATA_REQUEST');
      try {
      
        const data = await new LogisticsService().fetchAllDrivers();
        // const data = await response.json();
        console.log('Data fetched:', data);
        commit('FETCH_DATA_SUCCESS',  data.map(user => ({
            id: user.id,
            name: user.name,
            phone_number: user.phone,
            type: 'own',
            vehicles: 'KAX 200K',
            code_of_conduct: 'Valid',
            driver_license: 'Expired',
            food_handling_certificates: 'Expired',
        })));
      } catch (error) {
        commit('FETCH_DATA_FAILURE', error.message);
      }
    },
  },
  getters: {
    data(state) {
      return state.data;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    vehicles_data(state) {
      return state.data;
    },
    vehicles_loading(state) {
      return state.loading;
    },
    vehicles_error(state) {
      return state.error;
    },
  },
};

