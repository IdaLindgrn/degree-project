import { createWebHistory, createRouter } from "vue-router";

import Gameboard from "../views/Gameboard/GameboardPage.vue";
import Levels from "../views/Gameboard/ChooseLevel.vue";
import Home from "../views/GameWebsite/StartPage.vue";
import Tutorial from "../views/GameWebsite/TutorialPage.vue";
import Screenshots from "../views/GameWebsite/ScreenshotsPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    component: Tutorial,
  },
  {
    path: "/screenshots",
    name: "Screenshots",
    component: Screenshots,
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
