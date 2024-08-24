<template>
    <FormComponent :initialValues="initialValues" :type="type" :validationSchema="validationSchema" :handleSubmit="handleSubmit" :close="close" />
</template>

<script setup>
import FormComponent from './Form.vue';
import * as yup from 'yup';
import { ref } from 'vue';
import { LogisticsService } from '../../../service/LogisticsService';
import { useToast } from 'primevue/usetoast';
import { useStore } from 'vuex';
const toast = useToast();
const store = useStore();

// Props
const props = defineProps({
    close: {
        type: Function,
        required: true,
    },
});
const type = 'add'
const initialValues = ref({
      name: '',
      phone_number: '',
      driver_type: null,
      vehicle: null,
      code_of_conduct: 'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      food_handling_certificate: 'https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg',
      drivers_license: 'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      food_handling_certificate_expiration_date: '',
      code_of_conduct_expiration_date: '',
      drivers_license_expiration_date: '',
    })

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
function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('') + `${Math.floor(Math.random() * 900) + 100}`;
}
const handleSubmit = async (formData) => {



  // Send formData to your API using fetch or axios
  // Example using fetch
  try {
    formData.payment_method = "bank_transfer",
    formData.payment_details = {
    "bank_name": "Example Bank",
    "account_number": "1234567890"
    }
    formData.vehicle_id =formData?.vehicle.name
    formData.username = toCamelCase(formData.name)  
    formData.phone = formData.phone_number
    formData.address = '123 Main St, Anytown, USA'
    formData.type = formData.driver_type?.name
    const response = await new LogisticsService().createDriver(formData);
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Form Submitted.', life: 1000 });
    await store.dispatch('logistics/fetchDriversData');
    props.close()
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Submission Failed..!!', detail: `${error?.response?.data?.message}`, life: 1000 });
  }
  
   

}
</script>