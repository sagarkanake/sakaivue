<script setup>
import { ref } from 'vue';

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const dropdownItem = ref(null);
</script>

<template>
    <div class="grid" :style="{ 'margin-left': '-39px', 'margin-top': '-14px','margin-right': '-40px' }">
        <div :style="{ width: '64%','margin-top':'14px' }">
            <div class="card">
                <h5>Order Details</h5>
                <div>
                    <!-- First Row -->
                    <div class="form-row flex flex-wrap">
                        <div class="field col-12 md:col-4">
                            <label for="customer" :style="{'font-weight':'bold'}">Select Customer</label>
                            <Dropdown id="customer" v-model="selectedCustomer" :options="customers" placeholder="Select a Customer" />
                        </div>
                        <div class="field col-12 md:col-4">
                            <label for="orderDate" :style="{'font-weight':'bold'}">Order Date</label>
                            <Calendar v-model="calenderValue" selectionMode="range" :manualInput="false" placeholder="Select Delivery Date"></Calendar>
                        </div>
                        <div class="field col-12 md:col-4">
                            <label for="paymentType" :style="{'font-weight':'bold'}">Payment Type</label>
                            <Dropdown id="paymentType" v-model="selectedPaymentType" :options="paymentTypes" placeholder="Select Payment Type" />
                        </div>
                    </div>

                    <!-- Second Row -->
                    <div class="flex gap-2">
                        <div class="field" :style="{'margin-top':'-15px','margin-left':'10px'}">
                            <label for="deliveryMethod" :style="{'font-weight':'bold'}">Delivery Location</label>
                            <Dropdown id="deliveryMethod" v-model="selectedDeliveryMethod" :options="deliveryMethods"  placeholder="Select"  />
                            <!-- <Dropdown id="deliveryLocation" v-model="selectedDeliveryLocation" :options="deliveryLocations" placeholder="Select Delivery Location" /> -->
                        </div>
                        <div class="field" :style="{'margin-top':'-15px','margin-left':'10px'}">
                            <label for="deliveryMethod" :style="{'font-weight':'bold'}">Delivery Method</label>
                            <Dropdown id="deliveryMethod" v-model="selectedDeliveryMethod" :options="deliveryMethods" placeholder="Select" :style="{'font-size':'11px'}" />
                        </div>
                        <div  class="field" :style="{'margin-top':'-15px','margin-left':'10px'}">
                            <label for="deliveryWindow" :style="{'font-weight':'bold'}">Delivery Window</label>
                            <Dropdown id="deliveryWindow" v-model="selectedDeliveryWindow" :options="deliveryWindows" placeholder="Select" :style="{'font-size':'11px'}" />
                        </div>
                        <div class="field" :style="{'margin-top':'-15px','margin-left':'10px'}">
                            <label for="deliveryDate" :style="{'font-weight':'bold'}">Delivery Date</label>
                            <Calendar id="deliveryDate" v-model="deliveryDate" showIcon placeholder = "Select" :style="{'font-size':'11px'}" />
                        </div>
                    </div>

                    <!-- Third Row -->
                    <div>
                        <div class="field col-12">
                            <label for="orderNotes" :style="{'font-weight':'bold'}">Order Notes(Optional)</label>
                        </div>
                        <div :style="{'margin-top':'-30px','margin-left':'15px'}">
                            <Textarea id="orderNotes" v-model="orderNotes"  rows="4"  placeholder="Type your note here..." :style="{'width': '100%'}"></Textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div :style="{ width: '35%' }" class="md:col-6">
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
                        <div>LSG Sky Chef</div>
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
                        <div>LSG Sky Chef</div>
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
    </div>
</template>
