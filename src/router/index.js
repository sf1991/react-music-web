import React from "react";
import { Redirect, Route } from "react-router-dom";
import Recommend from "../pages/discover/recommend";
import Ranking from "../pages/discover/ranking";
import Discover from "@/pages/discover";
import Song from "@/pages/song";
import Mine from "@/pages/mine";
import Friend from "@/pages/friend";
const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: Discover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      {
        path: '/discover/recommend',
        component: Recommend,
      },
      {
        path: '/discover/rank',
        component: Ranking,
      }
    ]
  },
  {
    path: "/song",
    component: Discover,
    routes:[
      {
        path: '/',
        component:Song
      },
    ]
  },
  {
    path: "/friend",
    exact: true,
    component: Friend,
  },
  {
    path: "/mine",
    exact: true,
    component: Mine,
  },
];
export default routes
