import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Course from '../views/Course.vue';
import Post from '../views/Post.vue';
import About from '../views/About.vue';
import WordCharts from "../components/WordCharts";
import TreeCharts from "../components/TreeCharts";


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
        children:[
            {
                path: 'word/:id',
                name: 'Word',
                component: WordCharts,
            }
        ]
    },
    {
        path: '/course',
        name: 'Course',
        component: Course,
        children:[
            {
                path: 'tree/:id',
                name: 'TreeCharts',
                component: TreeCharts,
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router