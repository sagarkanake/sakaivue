import VueGoogleMaps from '@fawmi/vue-google-maps';

export default {
  install: (app) => {
    app.use(VueGoogleMaps, {
      load: {
        key: 'YOUR_GOOGLE_MAPS_API_KEY',
        libraries: 'places', // Optional: if you need additional libraries
      },
    });
  },
};
