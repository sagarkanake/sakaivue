<script>
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import { PrimeIcons } from 'primevue/api';
import { useRouter } from 'vue-router';
import AddDriverFrom from './Add.vue';
import Filters from './filters.vue';
// import { FilterMatchMode } from '@primevue/core/api';

export default {
    name: 'DriverData',
    components: {
        AddDriverFrom,
        Filters
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const display = ref(false);
        const loading = ref(true);

    //     vehicles_data(state) {
    //   return state.data;
    // },
    // vehicles_loading(state) {
    //   return state.loading;
    // },
    // vehicles_error(state) {
    //   return state.error;
    // },
        const vehicles = computed(() => store.getters['logistics/vehicles_data']);
        const isLoading = computed(() => store.getters['logistics/vehicles_loading']);
        const error = computed(() => store.getters['logistics/vehicles_error']);
        const dropdownValues = ref([
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ]);
        const dropdownValue = ref(null);
        const fetchVehiclesData = async () => {
            try {
                console.log('api call')
                await store.dispatch('logistics/fetchVehiclesData');
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchVehiclesData);

        const open = () => {
            display.value = true;
        };

        const close = () => {
            display.value = false;
        };

        const navigateTo = (path) => {
            console.log(`Navigating to ${path}`);
            router.push(path); // Navigate to the specified path
        };
        const filters = ref({
       global: { value: null}
        });

        return {
            display,
            open,
            close,
            vehicles,
            isLoading,
            navigateTo,
            dropdownValues,
            dropdownValue,
            filters
        };
    },
};
</script>
<template>
    <div class="card">
        <h5>Vehicles </h5>
       

        <div class=" flex justify-content-between">
            <IconField iconPosition="left">
                <InputText type="text" placeholder="Search" />
                <InputIcon class="pi pi-search" />
            </IconField>
            <!-- <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText  placeholder="Search..." />
            </IconField> -->
            <!-- <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template> -->
            <div class="">

                <!-- <div class="font-semibold text-xl">Select</div> -->
                <Filters />

                

                
            </div>
            <div class="flex-col ">
                <Button label="Export" icon="pi pi-file-export" class=" flex-1 mr-2 mb-2"></Button>
                <Button @click="open" label="Add Vehicle" icon="pi pi-plus"
                    class=" custom-green-900-button  flex-1  mr-2 mb-2"></Button>

            </div>
        </div>

        <div>
            <Dialog class=" h-full " header="Add Vehicle" v-model:visible="display" :breakpoints="{ '960px': '75vw' }"
                :style="{ width: '60vw', height: '70vw' }" :modal="true">
                <AddDriverFrom :close="close"></AddDriverFrom>
                <!-- <SampleForm /> -->

                <!-- <template #footer>
                    <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
                </template> -->
            </Dialog>
            <DataTable :value="vehicles" :rows="5" :paginator="true" responsiveLayout="scroll">
                <!-- <Column field="id" header="Id" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.id }}
                    </template>
                </Column> -->
                <Column field="Registration" header="Registration" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.id }}
                    </template>
                </Column>
                <Column field="owner" header="Owner" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.name }}
                    </template>
                </Column>
                <Column field="status" header="Status" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.type }}
                    </template>
                </Column>
                <Column field="driver" header="Driver" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.vehicles }}
                    </template>
                </Column>
                <Column field="ownership" header="Ownership" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.code_of_conduct }}
                    </template>
                </Column>
                <Column field="contact_number" header="Contact number" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.phone_number }}
                    </template>
                </Column>
                <Column field="lease_team" header="Lease team" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.food_handling_certificates }}
                    </template>
                </Column>
                <!-- <Column headerStyle="width:4rem">
          <template #body="slotProps">
            <Button icon="pi pi-search" />
          </template>
        </Column> -->
            </DataTable>
        </div>
    </div>
</template>
