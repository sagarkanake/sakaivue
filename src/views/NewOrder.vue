<script setup>
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { ProductService } from '@/service/ProductService';

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const customerList = ref([
    { name: 'Alice Johnson', label: 'Alice Johnson' },
    { name: 'Bob Smith', label: 'Bob Smith' },
    { name: 'Catherine Brown', label: 'Catherine Brown' },
    { name: 'David Wilson', label: 'David Wilson' },
    { name: 'Ella Garcia', label: 'Ella Garcia' },
    { name: 'Frank White', label: 'Frank White' },
    { name: 'Grace Taylor', label: 'Grace Taylor' },
    { name: 'Henry Martinez', label: 'Henry Martinez' },
    { name: 'Ivy Anderson', label: 'Ivy Anderson' },
    { name: 'Jack Thomas', label: 'Jack Thomas' }
]);
const paymentTypes = ref([
    { name: 'cash', label: 'Cash' },
    { name: 'credit', label: 'Credit' }
]);
const deliveryLocations = ref([
    { name: 'headquarter1', label: 'Headquarters 1' },
    { name: 'headquarter2', label: 'Headquarters 2' },
    { name: 'headquarter3', label: 'Headquarters 3' }
]);
const deliveryMethods = ref([
    { name: 'pickUpFromWarehouse', label: 'Pick up from warehouse' },
    { name: 'regularDelivery', label: 'Regular delivery' }
]);
const deliveryWindows = ref([
    { name: '1', label: '6am - 9am' },
    { name: '2', label: '9am - 12 pm' },
    { name: '3', label: '1pm - 4 pm' }
]);
const gradeFilters = ref([
    { name: '1', label: 'Grade 1' },
    { name: '2', label: 'Grade Rescue' }
]);
const filters = ref({});
const dropdownItem = ref(null);
const selectedCustomer = ref(null);
const today = new Date();
const calenderValue = ref(today);
const selectedPaymentType = ref(null);
const selectedDeliveryLocation = ref(null);
const selectedDeliveryMethod = ref(null);
const selectedDeliveryWindow = ref(null);
const deliveryDate = ref(null);
const productDialog = ref(false);
const products = ref(null);
const product = ref({});
const submitted = ref(false);
const selectedGradeFilter = ref(null);
const selectedProducts = ref(null);
const orderNotes = ref(null);
const tableData = ref([
    { sku: 1, name: 'Apple Crispy Red', grade: '1', available: '200', committed: 5, incoming: 56 },
    { sku: 1, name: 'Apple Crispy Red', grade: '1', available: '200', committed: 5, incoming: 56 },
    { sku: 1, name: 'Apple Crispy Red', grade: '1', available: '200', committed: 5, incoming: 56 },
    { sku: 1, name: 'Apple Crispy Red', grade: '1', available: '200', committed: 5, incoming: 56 },
    { sku: 1, name: 'Apple Crispy Red', grade: '1', available: '200', committed: 5, incoming: 56 },
    { sku: 1, name: 'Apple Crispy Red', grade: '1', available: '200', committed: 5, incoming: 56 }
    // Add more static data as needed
]);
const productService = new ProductService();

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    //  productService.getProducts().then((data) => (products.value = data));
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const getDropdownValue = () => {
    console.log('Printing selected customer ', selectedCustomer.value.label);
};

const formattedDate = computed(() => {
    if (!calenderValue.value) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return calenderValue.value.toLocaleDateString(undefined, options);
});

const addNewLineItem = () => {
    product.value = [];
    submitted.value = false;
    productDialog.value = true;
};

const addLineItem = () => {

}
</script>

<template>
    <h5 :style="{ 'font-size': 'large', 'font-weight': 'bold', 'margin-left': '-2rem' }">New Order</h5>
    <div class="grid" :style="{ 'margin-left': '-2rem' }">
        <div :style="{ width: '64%', 'margin-top': '14px' }">
            <div class="card">
                <h5 :style="{ color: 'gray', 'font-size': 'medium', 'margin-left': '-10px' }">Order Details</h5>
                <div :style="{ 'margin-left': '-22px' }">
                    <!-- First Row -->
                    <div class="form-row flex flex-wrap gap-2 ml-3 mt-1">
                        <div class="field flex-1 flex flex-column">
                            <label for="customer" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Select Customer</label>
                            <Dropdown id="customer" :style="{ borderRadius: '8px' }" v-model="selectedCustomer" :options="customerList" optionLabel="label" placeholder="Select" @change="getDropdownValue()" />
                        </div>
                        <div class="field flex-1 flex flex-column">
                            <label for="orderDate" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Order Date</label>
                            <Calendar v-model="calenderValue" :style="{ borderRadius: '8px' }" :manualInput="false" placeholder="Select"></Calendar>
                        </div>
                        <div class="field flex-1 flex flex-column">
                            <label for="paymentType" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Payment Type</label>
                            <Dropdown id="paymentType" :style="{ borderRadius: '8px' }" v-model="selectedPaymentType" :options="paymentTypes" optionLabel="label" placeholder="Select" />
                        </div>
                    </div>

                    <!-- Second Row -->
                    <div class="flex gap-2 ml-3 mt-4">
                        <div class="field flex-1 flex flex-column">
                            <label for="deliveryMethod" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Delivery Location</label>
                            <Dropdown id="deliveryMethod" :style="{ borderRadius: '8px' }" v-model="selectedDeliveryLocation" :options="deliveryLocations" optionLabel="label" class="custom-dropdown" placeholder="Select" />
                            <!-- <Dropdown id="deliveryLocation" v-model="selectedDeliveryLocation" :options="deliveryLocations" placeholder="Select Delivery Location" /> -->
                        </div>
                        <div class="field flex-1 flex flex-column">
                            <label for="deliveryMethod" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Delivery Method</label>
                            <Dropdown id="deliveryMethod" :style="{ borderRadius: '8px' }" v-model="selectedDeliveryMethod" :options="deliveryMethods" optionLabel="label" placeholder="Select" />
                        </div>
                        <div class="field flex-1 flex flex-column">
                            <label for="deliveryWindow" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Delivery Window</label>
                            <Dropdown id="deliveryWindow" :style="{ borderRadius: '8px' }" v-model="selectedDeliveryWindow" :options="deliveryWindows" optionLabel="label" placeholder="Select" />
                        </div>
                        <div class="field flex-1 flex flex-column">
                            <label for="deliveryDate" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Delivery Date</label>
                            <Calendar id="deliveryDate" :style="{ borderRadius: '8px' }" v-model="deliveryDate" showIcon placeholder="Select" />
                        </div>
                    </div>

                    <!-- Third Row -->
                    <div>
                        <div class="field col-12">
                            <label for="orderNotes" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Order Notes(Optional)</label>
                        </div>
                        <div :style="{ 'margin-top': '-30px', 'margin-left': '15px' }">
                            <Textarea id="orderNotes" v-model="orderNotes" rows="4" placeholder="Type your note here..." :style="{ width: '100%' }"></Textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :style="{ width: '36%' }" class="md:col-6">
            <div class="card p-fluid" :style="{}">
                <h5>Payment</h5>
                <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Subtotal</div>
                        <div>KSH200.00</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Delivery Fee</div>
                        <div>KSH00.00</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Coupon:FREEDL50</div>
                        <div>(KSH200.00)<i class="pi pi-trash" :style="{ color: 'red', 'margin-left': '4px' }"></i></div>
                    </div>
                    <div class="flex justify-content-between" :style="{ 'font-weight': 'bold' }">
                        <div>Total</div>
                        <div>KSH400.00</div>
                    </div>
                </div>
                <div :style="{ 'border-top': '2px solid #F6F6F6', 'margin-top': '20px' }"></div>
                <div class="flex" :style="{ width: '100%', gap: '14px', 'margin-top': '20px' }">
                    <InputText :style="{ width: '70%', 'border-radius': '14px' }" id="firstname1" type="text" placeholder="Coupon Code" />
                    <button label="Apply coupon" :style="{ width: '30%', 'background-color': '#DFEDDF', border: '0', 'border-radius': '10px' }"><span :style="{ 'font-size': '11px', 'font-weight': 'bold' }">Apply Coupon</span></button>
                </div>
            </div>

            <div class="card" :style="{ 'margin-top': '-14px' }">
                <h5>Customer</h5>
                <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Customer</div>
                        <div>{{ selectedCustomer ? selectedCustomer.label : '-' }}</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Contact Person</div>
                        <div>John Kamau</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Email</div>
                        <div>jkamau@gmail.com</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Phone</div>
                        <div>+254 2341234123</div>
                    </div>
                </div>
                <div :style="{ 'border-top': '2px solid #F6F6F6', 'margin-top': '20px' }"></div>
                <h5>Billing Details</h5>
                <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Customer</div>
                        <div>{{ selectedCustomer ? selectedCustomer.label : '-' }}</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Contact Person</div>
                        <div>John Kamau</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Address</div>
                        <div>PO Box - 0252525 - 0020</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">City</div>
                        <div>Nairobi</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">KRA Pin</div>
                        <div>KIOYU565645BYVN</div>
                    </div>
                </div>
                <div :style="{ 'border-top': '2px solid #F6F6F6', 'margin-top': '20px' }"></div>
                <h5>Delivery Details</h5>
                <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Delivery Address</div>
                        <div>Mama Ngina St, LSG Building 4th floor</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Delivery Date</div>
                        <div>July 30 24</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">Address</div>
                        <div>PO Box - 0252525 - 0020</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">City</div>
                        <div>Nairobi</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{ 'font-color': '#F6F6F6' }">KRA Pin</div>
                        <div>KIOYU565645BYVN</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" :style="{ width: '64%', 'margin-top': '-52%', height: 'auto' }">
            <DataTable
                ref="dt"
                :value="products"
                v-model:selection="selectedProducts"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center" :style="{ 'margin-top': '5px' }">
                        <h5 style="color: #808080">Line Items</h5>
                    </div>
                    <div class="flex justify-content-between gap-6 mt-2">
                        <div class="flex gap-2">
                            <div>
                                <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                    <InputIcon class="pi pi-search" />
                                    <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                                </IconField>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <Button type="button" label="Remove" icon="pi pi-trash" :style="{ 'background-color': '#DFEDDF', border: '#DFEDDF' }" @click="exportCSV($event)"></Button>
                            <Button type="button" label="Add" icon="pi pi-plus" :style="{ 'background-color': '#1E4A35', border: '#1E4A35' }" @click="addNewLineItem()"></Button>
                        </div>
                    </div>
                </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                <Column field="productId" header="Product ID" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Order No.</span>
                        {{ slotProps.data.code }}
                    </template>
                </Column>
                <Column field="item" header="Item" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Customer</span>
                        {{ slotProps.data.name }}
                    </template>
                </Column>
                <Column field="grade" header="Grade" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Order Date</span>
                        <img :src="'/demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
                    </template>
                </Column>
                <Column field="unit" header="Unit" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Status</span>
                        <Tag :severity="getBadgeSeverity(slotProps.data.inventoryStatus)">{{ slotProps.data.inventoryStatus }}</Tag>
                    </template>
                </Column>
                <Column field="stdWgt" header="Std Wgt(G)" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Items</span>
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column field="invEq" header="INV eq(KG)" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Amount</span>
                        {{ slotProps.data.category }}
                    </template>
                </Column>
                <Column field="processing" header="Processing" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Delivery</span>
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column>
                <Column field="specificatios" header="specifications" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Delivery Date</span>
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column>
                <Column field="unitCost" header="Unit Cost" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Delivery Window</span>
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column>
                <Column field="payment" header="Payment" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                    <template #body="slotProps">
                        <span class="p-column-title">Payment</span>
                        <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                    </template>
                </Column>
                <Column headerStyle="min-width:10rem;">
                    <template #body>
                        <Button icon="pi pi-ellipsis-v" type="button" class="p-button-text"></Button>
                    </template>
                </Column>
            </DataTable>

            <Dialog v-model:visible="productDialog" :style="{ width: '650px',height: '430px' }" :modal="true" class="p-fluid">
                <template #header>
                    <div class="dialog-header">
                        <i class="pi pi-plus" :style="{ 'margin-right': '8px', color: '#122C20' }"></i>
                        <span :style="{ color: '#122C20', 'font-size': '18px', 'font-weight': '700' }">Add Line Item</span>
                    </div>
                </template>
                <div class="card">
                    <DataTable ref="dt" :value="tableData" v-model:selection="selectedProducts" dataKey="sku" :scrollable="true" scrollHeight="200px" :style="{'margin-left': '-20px'}">
                        <template #header>
                            <div class="flex justify-content-between" :style="{ 'margin-top': '-30px', 'margin-left': '-14px' }">
                                <div>
                                    <IconField iconPosition="left" class="block mt-1 md:mt-0">
                                        <InputIcon class="pi pi-search" />
                                        <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                                    </IconField>
                                </div>
                                <div :style="{ 'margin-right': '-17px' }">
                                    <Dropdown id="deliveryWindow" :style="{ borderRadius: '8px' }" v-model="selectedGradeFilter" :options="gradeFilters" optionLabel="label" placeholder="Filter By Grade" />
                                </div>
                            </div>
                        </template>
                        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                        <Column field="sku" header="SKU" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">SKU</span>
                                {{ slotProps.data.sku }}
                            </template>
                        </Column>
                        <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Name</span>
                                {{ slotProps.data.name }}
                            </template>
                        </Column>
                        <Column field="grade" header="Grade" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Grade</span>
                                {{ slotProps.data.grade }}
                            </template>
                        </Column>
                        <Column field="available" header="Available" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Available</span>
                                {{ slotProps.data.available }}
                            </template>
                        </Column>
                        <Column field="committed" header="Committed" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Committed</span>
                                {{ slotProps.data.committed }}
                            </template>
                        </Column>
                        <Column field="incoming" header="Incoming" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                            <template #body="slotProps">
                                <span class="p-column-title">Incoming</span>
                                {{ slotProps.data.committed }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
                 <div class="flex justify-content-end gap-2 ml-5">
                        <Button type="button" label="Remove" icon="pi pi-trash" :style="{ 'background-color': '#DFEDDF', border: '#DFEDDF', width: '100px' }" @click="exportCSV($event)"></Button>
                        <Button type="button" label="Add" icon="pi pi-plus" :style="{ 'background-color': '#1E4A35', border: '#1E4A35', width: '100px' }" @click="addNewLineItem()"></Button>
                    </div>
            </Dialog>
        </div>
    </div>
</template>
<style scoped>
/* Scoped styles to target the placeholder text in the dropdown */
.custom-dropdown .p-dropdown-label.p-placeholder {
    font-size: 12px !important; /* Adjust the font size as needed */
    color: #e21818 !important; /* Adjust the color if needed */
}
:deep(.rounded-dropdown .p-dropdown) {
    border-radius: 8px !important;
}
</style>
