import { createWebHistory, createRouter } from "vue-router";

import Gameboard from "../views/Gameboard/GameboardPage.vue";
import Levels from "../views/Gameboard/ChooseLevel.vue";
import Home from "../views/GameWebsite/StartPage.vue";
import About from "../views/GameWebsite/AboutPage.vue";
import Profile from "../views/Profile/ProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/gameboard:levelId",
    name: "Gameboard",
    component: Gameboard,
  },
  {
    path: "/levels",
    name: "Levels",
    component: Levels,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
