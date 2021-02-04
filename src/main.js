import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { auth } from '@/firebase';

// Ensure firebase is initialized before loading the app (to prevent unauthorized access)
let app;

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount('#app');
  }

  if (user) {
    store.dispatch('getUserProfile', user);
  }
});
