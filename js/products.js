import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'wen2289',
            products: [],
            product_detail: {}
        }
    },
    methods: {
        checkUser() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token; //每次(default)發出請求時，header加入此參數
            axios.post(`${this.apiUrl}/api/user/check`)
                .then((res) => {
                    this.getData();
                })
                .catch((err) => {
                    alert("請先登入平台");
                    location.assign("login.html");
                })
        },
        getData() {
            axios.defaults.headers.common['Authorization'] = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
    mounted() {
        this.checkUser();
    }
}).mount('#app');
