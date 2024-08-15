<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            {
                label: 'Sales', icon: 'pi pi-shopping-bag',
                items: [
                    { label: 'Orders', icon: 'pi pi-circle-fill', style: "font-size: 1rem", to: '/sales/orders' },
                    { label: 'Invoices', icon: 'pi pi-circle-fill', to: '/sales/invoices' },
                    { label: 'Rejects', icon: 'pi pi-fw pi-prime', to: '/sales/rejects' },
                    { label: 'Flash Sales', icon: 'pi pi-fw pi-desktop', to: '/sales/flash-sales' },
                    { label: 'Coupons', icon: 'pi pi-fw pi-prime', to: '/sales/coupons' },
                    { label: 'Customers', icon: 'pi pi-fw pi-desktop', to: '/sales/customers' },
                    { label: 'Lead', icon: 'pi pi-fw pi-prime', to: '/sales/leads' },
                    { label: 'Commissions', icon: 'pi pi-fw pi-desktop', url: '/uikit/table' },
                    { label: 'Commissions - Admin', icon: 'pi pi-fw pi-prime', to: '/uikit/table' },
                    { label: 'Feedback', icon: 'pi pi-fw pi-desktop', url: '/uikit/table' },
                ]
            },
            {
                label: 'Inventory',
                items: [
                    { label: 'Products', icon: 'pi pi-fw pi-prime', style: "font-size: 1rem", to: '/uikit/table' },
                    { label: 'Pricing', icon: 'pi pi-fw pi-desktop', url: '/uikit/table' },
                    { label: 'Customer Pricing', icon: 'pi pi-fw pi-prime', to: '/uikit/table' },
                    { label: 'Real Time Inventory', icon: 'pi pi-fw pi-desktop', url: '/uikit/table' },
                    { label: 'Forecasting', icon: 'pi pi-fw pi-prime', to: '/uikit/table' },
                    { label: 'Deductions', icon: 'pi pi-fw pi-desktop', url: '/uikit/table' },
                    { label: 'Stock Movement', icon: 'pi pi-fw pi-prime', to: '/uikit/table' },
                    { label: 'Commissions', icon: 'pi pi-fw pi-desktop', url: '/uikit/table' },
                    { label: 'Commissions - Admin', icon: 'pi pi-fw pi-prime', to: '/uikit/table' },
                    { label: 'Feedback', icon: 'pi pi-fw pi-desktop', url: '/uikit/table' },
                ]
            },
            {
                label: 'Logistics', icon: 'pi pi-shopping-bag',
                items: [
                    { label: 'Driver', icon: 'pi pi-circle-fill', style: "font-size: 1rem", to: '/logistics/drivers' },
                    { label: 'Vehicles', icon: 'pi pi-circle-fill', to: '/logistics/vehicles' },
                    { label: 'Mileage', icon: 'pi pi-fw pi-prime',to: '/logistics/mileage'},
                    { label: "PODs", icon: 'pi pi-fw pi-desktop',to: '/logistics/pods' },
                ]
            },

            { label: 'Sourcing', icon: 'pi pi-fw pi-bookmark', to: '/uikit/table' },
            { label: 'Dispatch', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/table' },
            { label: 'Finance', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'Users', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped>
.large-icon .pi {
    font-size: 24px;
}
</style>