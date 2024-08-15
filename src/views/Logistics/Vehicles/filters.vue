<script setup>
import { CountryService } from '@/service/CountryService';
import { NodeService } from '@/service/NodeService';
import { onMounted, ref } from 'vue';

const statuses = ref([
    { label: 'paid', value: 'Paid' },
    { label: 'pending', value: 'Pending' },
    { label: 'unpaid', value: 'Unpaid' }
]);

const multiselectValue = ref(null);
const toggleValue = ref(false);
const selectButtonValue = ref(null);
const selectButtonValues = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]);
const knobValue = ref(50);
const inputGroupValue = ref(false);
const treeSelectNodes = ref(null);
const selectedNode = ref(null);
const filterDialog = ref(false);
const products = ref(null);
const product = ref({});
const submitted = ref(false);

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const openFilter = () => {
    product.value = {};
    submitted.value = false;
    filterDialog.value = true;
};

const clearFilter = () => {
    calenderValue.value = '';
    status.value = '';
    filters['global'].value = '';
};
// onMounted(() => {
//     CountryService.getCountries().then((data) => (autoValue.value = data));
//     NodeService.getTreeNodes().then((data) => (treeSelectNodes.value = data));
// });
function searchCountry(event) {
    setTimeout(() => {
        if (!event.query.trim().length) {
            autoFilteredValue.value = [...autoValue.value];
        } else {
            autoFilteredValue.value = autoValue.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}
</script>

<template>
    <Fluid class="flex flex-col md:flex-row gap-8">

        <div class="md:w-1/2">


            <div class=" flex flex-col gap-4">
                <!-- <div class="font-semibold text-xl">Listbox</div>
                <Listbox v-model="listboxValue" :options="listboxValues" optionLabel="name" :filter="true" /> -->

                <!-- <div class="font-semibold text-xl">Select</div> -->
                <div>
                    <!-- <label for="state">Status</label> -->
                    <Dropdown id="state" v-model="status" :options="statuses" optionLabel="value" placeholder="Select Status"></Dropdown>
                </div>
                <div>
                    <Button type="button" icon="pi pi-filter-fill" label="Filter" outlined @click="openFilter()" />
                </div>
                <div>
                    <Button type="button" icon="pi pi-filter-slash" outlined @click="clearFilter()" />
                </div>
            </div>
            <Dialog v-model:visible="filterDialog" :style="{ width: '350px' }" :modal="true" class="p-fluid">
                    <template #header>
                        <div class="p-d-flex p-ai-center">
                            <span class="pi pi-filter p-mr-1" style="color: darkgreen; font-weight: 700"></span>
                            <!-- PrimeIcons class for the filter icon with custom color -->
                            <span class="p-ml-n6" style="color: darkgreen; font-weight: 700; font-size: larger"> More Filters</span>
                            <!-- PrimeFlex classes for margin-left and bold text -->
                        </div>
                    </template>

                    <div class="field">
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="value" placeholder="Select Owner">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="value" placeholder="Select Ownership">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>
                    
                    <div class="field">
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="value" placeholder="Select Vehicle Type">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{ slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>
                    <template #footer>
                        <Button type="button" label="Cancel" icon="pi pi-times" :style="{ 'background-color': '#C8E6C9', border: '#C8E6C9' }" @click="hideDialog" />
                        <Button type="button" label="Save" icon="pi pi-check" :style="{ 'background-color': 'darkgreen', border: 'darkgreen' }" @click="saveProduct" />
                    </template>
                </Dialog>


        </div>
    </Fluid>


</template>