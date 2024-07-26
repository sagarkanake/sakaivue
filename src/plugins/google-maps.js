import { createApp } from 'vue';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp({});

app.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_GOOGLE_MAPS_API_KEY',
  },
});

export default app;
