<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);
const status = ref(null);
const productService = new ProductService();
const calenderValue = ref(null);
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
    productDialog.value = false;
    submitted.value = false;
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
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" :style="{'padding': '0 !important','height':'110%'}">
                <div class="flex justify-content-between mb-2" :style="{'margin-left':'8px','margin-top':'10px'}">
                    <div >
                        <span class="block text-500 font-medium mb-3">Total Orders</span>
                        <div class="text-xl" :style="{'font-weight': 600,'margin-top':'-8px'}">1234</div>
                    </div>
                </div>
                <Badge severity="danger" :style="{'margin-left':'8px','margin-top':'-6px'}"> 12.89%</Badge>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" :style="{'padding': '0 !important','height':'110%'}">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">All Orders</span>
                        <div class="text-900 font-medium text-xl">$2.100</div>
                    </div>
                </div>
                <span class="text-green-500 font-medium">%52+ </span>
                <span class="text-500">since last week</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" :style="{'padding': '0 !important','height':'110%'}">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Customers</span>
                        <div class="text-900 font-medium text-xl">28441</div>
                    </div>
                </div>
                <span class="text-green-500 font-medium">520 </span>
                <span class="text-500">newly registered</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0" :style="{'padding': '0 !important','height':'110%'}">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Comments</span>
                        <div class="text-900 font-medium text-xl">152 Unread</div>
                    </div>
                </div>
                <span class="text-green-500 font-medium">85 </span>
                <span class="text-500">responded</span>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <!-- <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="openNew" />
                            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                    </template>
                </Toolbar> -->

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
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center" :style="{ 'margin-top': '-20px','margin-left':'-15px' }">
                            <h5 class="m-0">Orders</h5>
                            <!-- <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                            </IconField> -->
                
                        </div>
                        <div class="flex justify-content-between gap-6 mt-2" :style="{'margin-left':'-15px' }">
                           <div class="flex gap-2 ">
                             <div >
                                <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                    <InputIcon class="pi pi-search" />
                                    <InputText class="w-full sm:w-auto" v-model="filters['global'].value" placeholder="Search..." />
                                </IconField>
                            </div>
                            <div>
                                   <Calendar v-model="calenderValue" selectionMode="range" :manualInput="false"  placeholder="Calendar"></Calendar>
                            </div>
                            <div >
                                <!-- <label for="state">Status</label> -->
                                <Dropdown id="state" v-model="status" :options="statuses" optionLabel="value" placeholder="Select Status"></Dropdown>
                            </div>
                               <div>
                            <Button type="button" icon="pi pi-filter-fill" label="Filter" outlined @click="clearFilter1()" />
                        </div>
                        <div>
                            <Button type="button" icon="pi pi-filter-slash"  outlined @click="clearFilter1()" />
                        </div>
                           </div>
                             
                           <div class="flex gap-2" :style="{'margin-right':'-22px' }">
                            <Button type="button" label="Export" icon="pi pi-file-export"  @click="exportCSV($event)" />
                            <Button  type="button" label="New" icon="pi pi-plus" :style="{'background-color':'#81C784'}" @click="openNew" />
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
                       <template #body>
                            <Button icon="pi pi-ellipsis-v" type="button" class="p-button-text"></Button>
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true" class="p-fluid">
                    <img :src="'/demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">Name</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="description">Description</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
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
                        <label class="mb-3">Category</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Price</label>
                            <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" :invalid="submitted && !product.price" :required="true" />
                            <small class="p-invalid" v-if="submitted && !product.price">Price is required.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Quantity</label>
                            <InputNumber id="quantity" v-model="product.quantity" integeronly />
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" text="" @click="saveProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >Are you sure you want to delete <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
