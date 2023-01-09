import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      apiUrl: 'https://vue3-course-api.hexschool.io/v2/'
    }
  },
  methods: {
    login() {
      axios.post(`${this.apiUrl}admin/signin`, this.user)
      .then((res) => {
        const { token, expired } = res.data;
        document.cookie = `user=${token}; expires=${expired};`;
        location.assign("products.html");
      })
      .catch(err => {
        console.error(err);
        alert("登入失敗");
      })
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token; //每次(default)發出請求時，header加入此參數
    axios.post(`${this.apiUrl}api/user/check`)
    .then((res) => {
      location.assign("products.html");
    })
    .catch((err) => {
      console.log(err.message);
    })
  }
}).mount("#app");