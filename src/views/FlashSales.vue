<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const toast = useToast();

const router = useRouter();
const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const filterDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
    { label: 'paid', value: 'Paid' },
    { label: 'pending', value: 'Pending' },
    { label: 'unpaid', value: 'Unpaid' }
]);
const status = ref(null);
const productService = new ProductService();
const addFlashSale = ref(false);
let calenderValue = ref(null);
const editFlashSaleDialog = ref(false);
const items = ref([
    { label: 'Edit', icon: 'pi pi-fw pi-plus', command: () => handleMenuAction('Edit') },
    { label: 'Delete Flash Sale', icon: 'pi pi-fw pi-trash', command: () => handleMenuAction('Delete'), class: 'delete-menu-item' }
]);

const getBadgeSeverity = (inventoryStatus) => {
    switch (inventoryStatus.toLowerCase()) {
        case 'instock':
            return 'success';
        case 'lowstock':
            return 'warning';
        case 'outofstock':
            return 'danger';
        default:
            return 'info';
    }
};

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    productService.getProducts().then((data) => (products.value = data));
});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    deleteProductDialog.value = false;
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

const openAddNewFlashSale = () => {
    addFlashSale.value = true;
};
const saveProduct = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const newOrder = () => {
    router.push({ path: '/sales/orders/new-orders' });
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const handleMenuAction = (action, item) => {
    if (action === 'Edit') {
        editFlashSaleDialog.value = true;
    } else if (action === 'Delete') {
        deleteProductDialog.value = true;
    }
};

const deleteFlashSale = () => {
    deleteProductDialog.value = false;
}
</script>

<template>
    <div class="grid" :style="{ 'margin-left': '-50px', 'margin-top': '-30px' }">
        <div class="col-12 lg:col-3 xl:col-3">
            <div class="card mb-0 p-0" :style="{ height: 'calc(110% + 5px)' }">
                <div class="flex justify-content-between mb-2 ml-2 mt-2">
                    <div>
                        <span class="block text-500 font-medium mb-1">Total Orders</span>
                        <div class="text-xl font-bold mt--0">1234</div>
                    </div>
                </div>
                <Badge severity="danger" class="ml-2 mt--2"> <i class="pi pi-arrow-down" :style="{ 'font-size': 'smaller' }"></i> 12.89%</Badge>
                <span class="text-400" :style="{ 'font-size': '12px' }"> vs last months : 1200</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 p-0" :style="{ height: 'calc(110% + 5px)' }">
                <div class="flex justify-content-between mb-2 ml-2 mt-2">
                    <div>
                        <span class="block text-500 font-medium mb-1">All Orders</span>
                        <div class="text-xl font-bold mt--0">1234</div>
                    </div>
                </div>
                <Badge severity="success" class="ml-2 mt--2"> <i class="pi pi-arrow-down" :style="{ 'font-size': 'smaller' }"></i> 12.89% </Badge>
                <span class="text-400" :style="{ 'font-size': '12px' }"> vs last months : 1200</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 p-0" :style="{ height: 'calc(110% + 5px)' }">
                <div class="flex justify-content-between mb-2 ml-2 mt-2">
                    <div>
                        <span class="block text-500 font-medium mb-1">Customers</span>
                        <div class="text-xl font-bold mt--0">1234</div>
                    </div>
                </div>
                <Badge severity="info" class="ml-2 mt--2"><i class="pi pi-arrow-down" :style="{ 'font-size': 'smaller' }"></i> 12.89% </Badge>
                <span class="text-400" :style="{ 'font-size': '12px' }"> vs last months : 1200</span>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 p-0" :style="{ height: 'calc(110% + 5px)' }">
                <div class="flex justify-content-between mb-2 ml-2 mt-2">
                    <div>
                        <span class="block text-500 font-medium mb-1">Comments</span>
                        <div class="text-xl font-bold mt--0">1234</div>
                    </div>
                </div>
                <Badge severity="warning" class="ml-2 mt--2"><i class="pi pi-arrow-down" :style="{ 'font-size': 'smaller' }"></i> 12.89% </Badge>
                <span class="text-400" :style="{ 'font-size': '12px' }"> vs last months : 1200</span>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
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
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center" :style="{ 'margin-top': '-20px', 'margin-left': '-15px' }">
                            <h5 class="m-0">Flash Sales</h5>
                        </div>
                        <div class="flex justify-content-between gap-6 mt-2" :style="{ 'margin-left': '-15px' }">
                            <div class="flex gap-2">
                                <div>
                                    <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                        <InputIcon class="pi pi-search" />
                                        <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                                    </IconField>
                                </div>
                                <div>
                                    <Calendar v-model="calenderValue" selectionMode="range" :manualInput="false" placeholder="Calendar"></Calendar>
                                </div>
                                <div>
                                    <!-- <label for="state">Status</label> -->
                                    <Dropdown id="state" v-model="status" :options="statuses" optionLabel="value" placeholder="Select Status"></Dropdown>
                                </div>
                            </div>

                            <div class="flex gap-2" :style="{ 'margin-right': '-22px' }">
                                <Button type="button" label="Export" icon="pi pi-file-export" :style="{ 'background-color': '#C8E6C9', border: '#C8E6C9' }" @click="exportCSV($event)"></Button>
                                <Button type="button" label="New Flash Sale" icon="pi pi-plus" :style="{ 'background-color': 'darkgreen', border: 'darkgreen' }" @click="openAddNewFlashSale()"></Button>
                            </div>
                        </div>
                    </template>

                    <Column field="orderNo" header="Order No." :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Order No.</span>
                            {{ slotProps.data.code }}
                        </template>
                    </Column>
                    <Column field="customer" header="Customer" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Customer</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="orderDate" header="Order Date" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Order Date</span>
                            <img :src="'/demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="inventoryStatus" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Status</span>
                            <Tag :severity="getBadgeSeverity(slotProps.data.inventoryStatus)">{{ slotProps.data.inventoryStatus }}</Tag>
                        </template>
                    </Column>
                    <Column field="items" header="Items" :sortable="true" headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Items</span>
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="amount" header="Amount" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Amount</span>
                            {{ slotProps.data.category }}
                        </template>
                    </Column>
                    <Column field="delivery" header="Delivery" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Delivery</span>
                            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                        </template>
                    </Column>
                    <Column field="deliveryDate" header="Delivery Date" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Delivery Date</span>
                            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                        </template>
                    </Column>
                    <Column field="deliveryWindow" header="Delivery Window" :sortable="true" headerStyle="width:14%; min-width:10rem;">
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
                        <template #body="slotProps">
                            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                            <Menu ref="menu2" :popup="true" :model="items" @click="handleMenuAction($event, slotProps)"></Menu>
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="addFlashSale" :style="{ width: '450px' }" :modal="true" class="p-fluid">
                    <template #header>
                        <div class="p-d-flex p-ai-center">
                            <span class="pi pi-plus p-mr-1" style="color: darkgreen; font-weight: 700"></span>
                            <!-- PrimeIcons class for the filter icon with custom color -->
                            <span class="p-ml-n6 ml-2" style="color: darkgreen; font-weight: 700; font-size: larger">Add Flash Sale</span>
                            <!-- PrimeFlex classes for margin-left and bold text -->
                        </div>
                    </template>
                    <div class="field">
                        <label for="name" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Product</label>
                        <Dropdown id="state" v-model="status" :options="statuses" optionLabel="value" placeholder="Select Product"></Dropdown>
                    </div>
                    <div class="flex justify-content-between">
                        <div>
                            <label for="name" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Unit</label>
                            <Dropdown id="state" v-model="status" :options="statuses" optionLabel="value" placeholder="Select Unit"></Dropdown>
                        </div>
                        <div>
                            <label for="description" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Quantity</label>
                            <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" :invalid="submitted && !product.price" :required="true" />
                        </div>
                    </div>
                    <div class="flex justify-content-between mt-3 gap-2">
                        <div>
                            <label for="orderDate" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Start Date</label>
                            <Calendar v-model="calenderValue" :style="{ borderRadius: '8px' }" :showIcon="true" :manualInput="false" placeholder="DD/MM/YYYY"></Calendar>
                        </div>
                        <div>
                            <label for="orderDate" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">End Date</label>
                            <Calendar v-model="calenderValue" :style="{ borderRadius: '8px' }" :showIcon="true" :manualInput="false" placeholder="DD/MM/YYYY"></Calendar>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="description" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Flash Sale Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" :invalid="submitted && !product.price" :required="true" default="0" />
                    </div>

                    <template #footer>
                        <Button type="button" label="Cancel" icon="pi pi-times" :style="{ 'background-color': '#C8E6C9', border: '#C8E6C9' }" @click="hideDialog()"></Button>
                        <Button type="button" label="Save" icon="pi pi-check" :style="{ 'background-color': 'darkgreen', border: 'darkgreen' }" @click="saveProduct()"></Button>
                    </template>
                </Dialog>

                <Dialog v-model:visible="editFlashSaleDialog" :style="{ width: '450px' }" :modal="true" class="p-fluid">
                    <template #header>
                        <div class="p-d-flex p-ai-center">
                            <span class="pi pi-plus p-mr-1" style="color: darkgreen; font-weight: 700"></span>
                            <!-- PrimeIcons class for the filter icon with custom color -->
                            <span class="p-ml-n6 ml-2" style="color: darkgreen; font-weight: 700; font-size: larger">Edit Flash Sale</span>
                            <!-- PrimeFlex classes for margin-left and bold text -->
                        </div>
                    </template>
                    <div class="field">
                        <label for="name" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Product</label>
                        <Dropdown id="state" v-model="status" :options="statuses" optionLabel="value" placeholder="Select Product"></Dropdown>
                    </div>
                    <div class="flex justify-content-between">
                        <div>
                            <label for="name" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Unit</label>
                            <Dropdown id="state" v-model="status" :options="statuses" optionLabel="value" placeholder="Select Unit"></Dropdown>
                        </div>
                        <div>
                            <label for="description" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Quantity</label>
                            <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" :invalid="submitted && !product.price" :required="true" />
                        </div>
                    </div>
                    <div class="flex justify-content-between mt-3 gap-2">
                        <div>
                            <label for="orderDate" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Start Date</label>
                            <Calendar v-model="calenderValue" :style="{ borderRadius: '8px' }" :showIcon="true" :manualInput="false" placeholder="DD/MM/YYYY"></Calendar>
                        </div>
                        <div>
                            <label for="orderDate" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">End Date</label>
                            <Calendar v-model="calenderValue" :style="{ borderRadius: '8px' }" :showIcon="true" :manualInput="false" placeholder="DD/MM/YYYY"></Calendar>
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="description" :style="{ 'font-weight': 'bold', 'font-size': 'small' }">Flash Sale Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" :invalid="submitted && !product.price" :required="true" default="0" />
                    </div>

                    <template #footer>
                        <Button type="button" label="Delete" icon="pi pi-trash" :style="{ 'background-color': '#FCE8E8', border: '#C80000', color: '#C80000' }" @click="hideDialog()"></Button>
                        <Button type="button" label="Save Flash Sale" icon="pi pi-save" :style="{ 'background-color': 'darkgreen', border: 'darkgreen' }" @click="saveProduct()"></Button>
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" :closable="false" :modal="true">
                    <template #header>
                        <div>
                            <h5 :style="{ 'font-weight': '700' }">Are you absolutely sure?</h5>
                            <div class="mt-1">
                                <span :style="{ color: gray }">This action cannot be undone. This will permanently remove the flash sale.</span>
                            </div>
                        </div>
                    </template>
                    <template #footer>
                        <Button type="button" label="Cancel" icon="pi pi-times" :style="{ 'background-color': '#DFEDDF', border: '#DFEDDF', color: '#122C20' }" @click="hideDialog()"></Button>
                        <Button type="button" label="Yes, Do it" icon="pi pi-check" :style="{ 'background-color': '#C80000', border: '#C80000',color:'#FFFFFF' }" @click="deleteFlashSale()"></Button>
                    </template>
                </Dialog>

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
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="value" placeholder="Select Payment Status">
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
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="value" placeholder="Select Customer">
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
                        <Calendar v-model="calenderValue" selectionMode="range" :manualInput="false" placeholder="Select Delivery Date"></Calendar>
                    </div>
                    <div class="field">
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="value" placeholder="Select Delivery Window">
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
        </div>
    </div>
</template>
<style scoped>
/* Custom styles for the Delete menu item */
.delete-menu-item {
    color: red; /* Example style */
    font-weight: bold; /* Example style */
}
</style>

