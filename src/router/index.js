import Vue from 'vue';
import Router from 'vue-router';
import Resume from '@/pages/resume';
import Home from '@/pages/home';
import { MdButton, MdContent, MdTabs, MdCard } from 'vue-material/dist/components';

Vue.use(Router);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdCard);
export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/resume/:resumeid',
            name: 'resume',
            component: Resume
        }
    ]
});
