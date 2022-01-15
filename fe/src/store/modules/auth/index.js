import API from '../../base/'

export default {
    namespaced: true,
    state: {
        user: {},
        task: {},
        token: localStorage.getItem('auth') || ''
    },
    getters: {},
    mutations: {
        SET_ACC(state, data) {
            state.user = data
            const bearer_token = localStorage.getItem('auth') || ''
            API.defaults.headers.common['Authorization'] = `Bearer ${bearer_token}`
        },
        SET_USER_TOKEN(state, token) {
            localStorage.setItem('auth', token)
            localStorage.setItem('isAdmin', 'true')
            state.token = token

            const bearer_token = localStorage.getItem('auth') || ''
            API.defaults.headers.common['Authorization'] = `Bearer ${bearer_token}`
        },
        UNSET_USER(state) {
            localStorage.removeItem('auth');
            localStorage.removeItem('isAdmin');
            state.token = ''

            API.defaults.headers.common['Authorization'] = ''
        },
        SET_TASK(state, data) {
            state.task = data
            const bearer_token = localStorage.getItem('auth') || ''
            API.defaults.headers.common['Authorization'] = `Bearer ${bearer_token}`
        },
    },
    actions: {
        async login({ commit }, payload) {
            const res = await API.post('/auth/user/login', payload).then(res => {
                commit('SET_ACC', res.data.user)
                commit('SET_USER_TOKEN', res.data.access_token)

                return res;
            }).catch(err => {
                return err.response;
            })

            return res;
        },
        async logoutAcc({ commit }) {
            const res = await API.post('auth/user/logout?token=' + localStorage.getItem('auth')).then(response => {
                commit('UNSET_USER')
                return response
            }).catch(error => {
                return error.response
            });

            return res;
        },
        async updateAccount({ commit }, data) {
            const res = await API.post(`auth/admin/update`, data).then(res => {
                return res;
            }).catch(err => {
                return err.response;
            })

            return res;
        },
        async checkUser({ commit }) {
            const res = await API.post('/auth/user/me?token=' + localStorage.getItem('auth')).then(res => {
                commit('SET_ACC', res.data)
                return res;
            }).catch(error => {
                if (error.response.status == 401) {
                    commit('UNSET_USER')
                    location.reload()
                }
                return error.response;
            })

            return res;
        },
        async getAllTasks({ commit }) {
            const res = await API.get('auth/user/getTask?token=' + localStorage.getItem('auth')).then(res => {
                commit('SET_TASK', res.data)
                return res;
            }).catch(error => {
                return error.response;
            })

            return res;
        },
        async saveUser({ commit }, payload) {
            const res = await API.post('/auth/user/storeUser', payload).then(res => {
                return res;
            }).catch(err => {
                return err.response
            })

            return res;
        },
        async saveTask({ commit }, payload) {
            const res = await API.post('/auth/user/storeTask', payload).then(res => {
                return res;
            }).catch(err => {
                return err.response
            })

            return res;
        },
        async updateTask({ commit }, { id, payload }) {
            const res = await API.put(`/auth/user/update/${id}`, payload).then(res => {
                return res;
            }).catch(err => {
                return err.response
            })

            return res;
        },
        async completeTask({ commit }, id) {
            const res = await API.put(`/auth/user/complete/${id}`).then(res => {
                return res;
            }).catch(err => {
                return err.response
            })

            return res;
        },
        async redoTask({ commit }, id) {
            const res = await API.put(`/auth/user/redo/${id}`).then(res => {
                return res;
            }).catch(err => {
                return err.response
            })

            return res;
        },
        async deleteTask({ commit }, id) {
            const res = await API.delete(`/auth/user/delete/${id}`).then(res => {
                return res;
            }).catch(err => {
                return err.response
            })

            return res;
        },
    },
}