<script setup>
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AddDriverFrom from './Add.vue';
import SampleForm from './SampleForm.vue';
import EditDriverFrom from './Edit.vue'
const store = useStore();
const router = useRouter();
const display = ref(false);
const editDisplay = ref(false);
const loading = ref(true);

const drivers = computed(() => store.getters['logistics/data']);
const isLoading = computed(() => store.getters['logistics/loading']);
const error = computed(() => store.getters['logistics/error']);
const dt = ref();
const items = ref([
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => handleMenuItemClick({ label: 'Edit' })
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => handleMenuItemClick({ label: 'Delete' })
    }
    // Add more items here
]);

const handleMenuItemClick = (item) => {
    console.log(`Menu item clicked: ${item.label}`);
    if(item.label == 'Edit'){
        editOpen()
    }
    // Add your custom logic here
};

function exportCSV() {
    dt.value.exportCSV();
}

const fetchDriversData = async () => {
    try {
        console.log('api call');
        await store.dispatch('logistics/fetchDriversData');
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchDriversData();
});

const open = () => {
    display.value = true;
};

const editOpen = () => {
    editDisplay.value = true;
};

const close = () => {
    display.value = false;
};

const editClose = () => {
    editDisplay.value = false;
};


const navigateTo = (path) => {
    console.log(`Navigating to ${path}`);
    router.push(path); // Navigate to the specified path
};

const handleClick = (event) => {
    console.log('Button clicked:', event);
    // Toggle the menu visibility
    const menu = $refs.menu2;
    if (menu) {
        menu.toggle(event);
    }
};
</script>
<template>
    <div class="card">
        <h5>Drivers </h5>
        <div class=" flex justify-content-between">
            <IconField iconPosition="left">
                <InputText type="text" placeholder="Search" />
                <InputIcon class="pi pi-search" />
            </IconField>
            <div class="flex-col ">
                <Button label="Export" icon="pi pi-file-export" @click="exportCSV($event)"  class=" flex-1 mr-2 mb-2"></Button>
                <Button @click="open" label="Add Driver" icon="pi pi-plus"
                    class=" custom-green-900-button  flex-1  mr-2 mb-2"></Button>

            </div>
        </div>

        <div>
            <Dialog class=" h-full " header="Add Driver" v-model:visible="display" :breakpoints="{ '960px': '75vw' }"
                :style="{ width: '70vw', height: '70vw' }" :modal="true">
                <AddDriverFrom :close="close"></AddDriverFrom> 
                

                <!-- <template #footer>
                    <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
                </template> -->
            </Dialog>
            <Dialog class=" h-full " header="Edit Driver" v-model:visible="editDisplay " :breakpoints="{ '960px': '75vw' }"
                :style="{ width: '70vw', height: '70vw' }" :modal="true">
                <EditDriverFrom :close="editClose"></EditDriverFrom> 
                

                <!-- <template #footer>
                    <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
                </template> -->
            </Dialog>
            <DataTable  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"  ref="dt" :value="drivers" :rows="5" :paginator="true" responsiveLayout="scroll">
                <Column field="id" header="Id" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.id }}
                    </template>
                </Column>
                <Column field="name" header="Name" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.name }}
                    </template>
                </Column>
                <Column field="phone_number" header="Phone Number" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.phone_number }}
                    </template>
                </Column>
                <Column field="type" header="Type" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.type }}
                    </template>
                </Column>
                <Column field="vehicles" header="Vehicles" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.vehicles }}
                    </template>
                </Column>
                <Column field="code_of_conduct" header="Code of conduct" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.code_of_conduct }}
                    </template>
                </Column>
                <Column field="driver_license" header="Driver license" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.driver_license }}
                    </template>
                </Column>
                <Column field="food_handling_certificates" header="Food handling certificates" :sortable="false">
                    <template #body="slotProps">
                        {{ slotProps.data.food_handling_certificates }}
                    </template>
                </Column>
                <Column headerStyle="min-width:10rem;">
                    <template #body="slotProps">
                        <!-- <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded /> -->
                        <!-- <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded @click="editProduct(slotProps.data)" /> -->
                        <!-- <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded /> -->
                        <div>
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
                                @click="$refs.menu2.toggle($event)"></Button>
                            <Menu ref="menu2" :popup="true" :model="items" class="!min-w-40">
                            </Menu>
                        </div>
                        <!-- <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded @click="confirmDeleteProduct(slotProps.data)" /> -->
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
