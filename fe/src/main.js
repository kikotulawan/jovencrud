import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Toast from 'vue-toastification';

import 'bootstrap';
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false


Vue.use(Toast, {
    position: 'bottom-left',
    timeout: 1600,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: true,
    rtl: false,
    maxToasts: 1,
    transition: 'Vue-Toastification__fade',
    newestOnTop: true,
    filterBeforeCreate: (toast, toasts) => {
        if (toasts.filter(
                t => t.type === toast.type
            ).length !== 0) {
            return false;
        }
        return toast;
    }
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')