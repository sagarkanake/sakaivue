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
    <div class="grid" :style="{ 'margin-left': '-50px', 'margin-top': '-30px' }">
        <div class="col-12 md:col-6">
            <div class="card p-fluid">
                <h5>Vertical</h5>
                <div class="field">
                    <label for="name1">Name</label>
                    <InputText id="name1" type="text" />
                </div>
                <div class="field">
                    <label for="email1">Email</label>
                    <InputText id="email1" type="text" />
                </div>
                <div class="field">
                    <label for="age1">Age</label>
                    <InputText id="age1" type="text" />
                </div>
            </div>

            <div class="card p-fluid">
                <h5>Vertical Grid</h5>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="name2">Name</label>
                        <InputText id="name2" type="text" />
                    </div>
                    <div class="field col">
                        <label for="email2">Email</label>
                        <InputText id="email2" type="text" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 md:col-6">
            <div class="card p-fluid" :style="{ height: '40%', width: '70%', 'margin-left': '33%' }">
                <h5>Payment</h5>
                <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Subtotal</div>
                        <div>KSH200.00</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Delivery Fee</div>
                        <div>KSH00.00</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Coupon:FREEDL50</div>
                        <div>(KSH200.00)<i class="pi pi-trash" :style="{ color: 'red', 'margin-left': '4px' }"></i></div>
                    </div>
                    <div class="flex justify-content-between" :style="{ 'font-weight': 'bold'}">
                        <div>Total</div>
                        <div>KSH400.00</div>
                    </div>
                </div>
                <div :style="{ 'border-top': '2px solid #F6F6F6','margin-top':'20px'}"></div>
                <div class="flex" :style="{ width: '100%', gap: '14px', 'margin-top':'20px' }">
                    <InputText :style="{ width: '70%', 'border-radius': '14px' }" id="firstname1" type="text" placeholder="Coupon Code" />
                    <button label="Apply coupon" :style="{ width: '30%', 'background-color': '#DFEDDF', border: '0', 'border-radius': '10px' }"><span :style="{ 'font-size': '11px','font-weight': 'bold' }">Apply Coupon</span></button>
                </div>
            </div>

            <div class="card" :style="{ height: '100%%', width: '80%', 'margin-left': '33%' }">
                <h5>Customer</h5>
               <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Customer</div>
                        <div>LSG Sky Chef</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Contact Person</div>
                        <div>John Kamau</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Email</div>
                        <div>jkamau@gmail.com</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Phone</div>
                        <div>+254 2341234123</div>
                    </div>
                </div>
                <div :style="{ 'border-top': '2px solid #F6F6F6','margin-top':'20px'}"></div>
                <h5>Billing Details </h5>
               <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Customer</div>
                        <div>LSG Sky Chef</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Contact Person</div>
                        <div>John Kamau</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Address</div>
                        <div>PO Box - 0252525 - 0020</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">City</div>
                        <div>Nairobi</div>
                    </div>
                     <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">KRA Pin</div>
                        <div>KIOYU565645BYVN</div>
                    </div>
                </div>
                <div :style="{ 'border-top': '2px solid #F6F6F6','margin-top':'20px'}"></div>
                <h5>Delivery Details </h5>
               <div :style="{ display: 'flex', 'flex-direction': 'column', gap: '16px' }">
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Delivery Address</div>
                        <div>Mama Ngina St, LSG Building 4th floor</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Delivery Date</div>
                        <div>July 30 24</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">Address</div>
                        <div>PO Box - 0252525 - 0020</div>
                    </div>
                    <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">City</div>
                        <div>Nairobi</div>
                    </div>
                     <div class="flex justify-content-between">
                        <div :style="{'font-color': '#F6F6F6'}">KRA Pin</div>
                        <div>KIOYU565645BYVN</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h5>Help Text</h5>
                <div class="field p-fluid">
                    <label for="username">Username</label>
                    <InputText id="username" type="text" />
                    <small>Enter your username to reset your password.</small>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <h5>Advanced</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="firstname2">Firstname</label>
                        <InputText id="firstname2" type="text" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="lastname2">Lastname</label>
                        <InputText id="lastname2" type="text" />
                    </div>
                    <div class="field col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" rows="4" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="city">City</label>
                        <InputText id="city" type="text" />
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="state">State</label>
                        <Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label for="zip">Zip</label>
                        <InputText id="zip" type="text" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
