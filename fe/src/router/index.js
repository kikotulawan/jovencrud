import Vue from 'vue';
import VueRouter from 'vue-router';

// AUTHENTICATION
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

import Index from '../views/admin/Index.vue';
import AdminMovies from '../views/admin/Movies.vue';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'login',
        meta: {
            hasUser: true,
        },
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/admin',
        name: 'adminIndex',
        redirect: '/admin/todo',
        component: Index,
        meta: { isAdmin: true, requiresLogin: true },
        children: [{
            path: 'todo',
            name: 'adminMovies',
            components: {
                adminMovies: AdminMovies
            },
        }]
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0, behavior: 'smooth' }
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresLogin) && !localStorage.getItem('auth')) {
        next({ name: 'login' });
    } else if (to.matched.some((record) => record.meta.hasUser) && localStorage.getItem('auth') && localStorage.getItem('isAdmin')) {
        next({ name: 'adminIndex' });
    } else {
        next();
    }
});
export default router;