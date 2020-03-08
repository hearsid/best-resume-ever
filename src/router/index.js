import Vue from 'vue';
import Router from 'vue-router';
import Resume from '@/pages/resume';
import Home from '@/pages/home';
import CV from '@/pages/cv';

Vue.use(Router);

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
        },
        {
            path: '/cv/:resumeid',
            name: 'cv',
            component: CV
        }
    ]
});
