<template>
    <FormComponent v-if="initialValues" 
    :initialValues="initialValues"  :type="type" :validationSchema="validationSchema"
        :handleSubmit="handleSubmit" :close="close" />
</template>

<script setup>
import FormComponent from './Form.vue';
import * as yup from 'yup';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { LogisticsService } from '../../../service/LogisticsService';
import { useToast } from 'primevue/usetoast';

// Props
const props = defineProps({
    close: {
        type: Function,
        required: true,
    }
});
// Access the Vuex store
const store = useStore();
const toast = useToast();
const initialValues = ref(null);
const selected_driver = computed(() => store.getters['logistics/selected_driver']);
const drivers = computed(() => store.getters['logistics/data']);
const driverTypes = 
  { 'own': 'Own' , 'lease' : 'Lease' , 'truck_owner' : 'Truck owner' }

onMounted(async () => {
    try {
        const data = await new LogisticsService().fetchDriverById(selected_driver.value.id);
        initialValues.value = {
            name: data.user.name,
            phone_number: data.user.phone,
            driver_type: { name: data.type , label: driverTypes[`${data.type}`]  },
            vehicle: { name: data?.vehicle?.id, label: data?.vehicle?.registration_number },
            code_of_conduct: data.code_of_conduct,
            food_handling_certificate: data.food_handling_certificate,
            drivers_license: data.drivers_license,
            food_handling_certificate_expiration_date: data.food_handling_certificate_expiration_date || '',
            code_of_conduct_expiration_date: data.code_of_conduct_expiration_date || '',
            drivers_license_expiration_date: data.drivers_license_expiration_date || '',
        };
    } catch (error) {
        console.error('Error fetching initial values:', error);
    }
});

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
    // code_of_conduct: yup.mixed().required('Code of conduct file is required'),
    // food_handling_certificate: yup.mixed().required('Food Handling Certificate file is required'),
    // drivers_license: yup.mixed().required('Drivers License file is required'),
    food_handling_certificate_expiration_date: yup.date().transform((value, orignalValue) => orignalValue === '' ? null : value).nullable().required('Expiration date is required'),
    code_of_conduct_expiration_date: yup.date().transform((value, orignalValue) => orignalValue === '' ? null : value).nullable().required('Expiration date is required'),
    drivers_license_expiration_date: yup.date().transform((value, orignalValue) => orignalValue === '' ? null : value).nullable().required('Expiration date is required'),
});

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
    // formData.username = toCamelCase(formData.name)  
    formData.phone = formData.phone_number
    formData.address = '123 Main St, Anytown, USA'
    formData.type = formData.driver_type?.name
    const response = await new LogisticsService().editDriver(formData,selected_driver.value.id);
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Form Submitted.', life: 1000 });
    await store.dispatch('logistics/fetchDriversData');
    props.close()
  } catch (error) {
    console.log('error',error)
    toast.add({ severity: 'error', summary: 'Submission Failed..!!', detail: `${error?.response?.data?.message}`, life: 1000 });
  }
}
</script>