<template>
    <FormComponent :initialValues="initialValues"  :type="type"  :validationSchema="validationSchema" :handleSubmit="handleSubmit" :close="close" />
</template>

<script setup>
import FormComponent from './Form.vue';
import * as yup from 'yup';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

// Props
const props = defineProps({
    close: {
        type: Function,
        required: true,
    }
});
// Access the Vuex store
const store = useStore();

const selected_driver = computed(() => store.getters['logistics/selected_driver']);
const drivers = computed(() => store.getters['logistics/data']);
onMounted(async () => {
    try {
        console.log('selected_driver',selected_driver , 'drivers', drivers)
        const response = await fetch(`/drivers/${selected_driver?.id}`); // Replace with your actual API endpoint
        const data = await response.json();

        initialValues.value = {
            name: data.name,
            phone_number: data.phone_number,
            driver_type: data.driver_type,
            vehicle: data.vehicle,
            code_of_conduct: data.code_of_conduct,
            food_handling_certificate: data.food_handling_certificate,
            drivers_license: data.drivers_license,
            food_handling_certificate_expiration_date: data.food_handling_certificate_expiration_date,
            code_of_conduct_expiration_date: data.code_of_conduct_expiration_date,
            drivers_license_expiration_date: data.drivers_license_expiration_date,
        };
    } catch (error) {
        console.error('Error fetching initial values:', error);
    }
});
const initialValues = ref({
      name: 'sagar k',
      phone_number: 1234567890,
      driver_type: { name: '1', label: 'Own' },
      vehicle: { name: '1', label: 'Own' },
      code_of_conduct: 'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      food_handling_certificate: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
      drivers_license: 'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      food_handling_certificate_expiration_date: '14/08/2024',
      code_of_conduct_expiration_date: '14/08/2024',
      drivers_license_expiration_date: '14/08/2024',
    })
const type = 'edit'
// Validation schema
const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    phone_number: yup
        .string()
        .matches(/^[0-9]+$/, 'Phone number must be only digits')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required'),
    driver_type: yup.object().required('Driver type is required'),
    // vehicle: yup.string().required('Vehicle is required'),
    code_of_conduct: yup.mixed().required('Code of conduct file is required'),
    food_handling_certificate: yup.mixed().required('Food Handling Certificate file is required'),
    drivers_license: yup.mixed().required('Drivers License file is required'),
    food_handling_certificate_expiration_date: yup.date().transform((value, orignalValue) => orignalValue === '' ? null : value).nullable().required('Expiration date is required'),
    code_of_conduct_expiration_date: yup.date().transform((value, orignalValue) => orignalValue === '' ? null : value).nullable().required('Expiration date is required'),
    drivers_license_expiration_date: yup.date().transform((value, orignalValue) => orignalValue === '' ? null : value).nullable().required('Expiration date is required'),
});

const handleSubmit = (formData) => {


  console.log('Form Data:', formData);

  // Send formData to your API using fetch or axios
  // Example using fetch
  fetch('/your-api-endpoint', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      toast.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.add({ severity: 'error', summary: 'Error', detail: 'Submission Failed', life: 3000 });
    });
}
</script>