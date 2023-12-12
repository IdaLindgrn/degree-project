import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "StartPage",
    component: () => import("../views/StartPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
