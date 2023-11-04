import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-teal/theme.css';

import '@/style.css';
import App from '@/App.vue';

const pinia = createPinia();

createApp(App).use(pinia).use(PrimeVue).use(ToastService).mount('#app');
