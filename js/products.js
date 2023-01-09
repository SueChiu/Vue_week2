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
        getCookie(user) {
            var cookieArr = document.cookie.split(";");
            for(var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");
                if(user == cookiePair[0].trim()) {
                    return;
                }
            }
            location.assign("login.html");
        },
        getData() {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
            .then((res) => {
                console.log(res);
                this.products = res.data.products;
                console.log(this.products.length);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getCookie("user");
        axios.defaults.headers.common.Authorization = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.getData();
    }
}).mount('#app');