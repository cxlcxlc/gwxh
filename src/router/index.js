import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Course from '../views/Course.vue';
import Post from '../views/Post.vue';
import About from '../views/About.vue';


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/post',
        name: 'Post',
        component: Post,
    },
    {
        path: '/course',
        name: 'Course',
        component: Course
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About,
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router