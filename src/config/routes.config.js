import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Explore from "../pages/Explore";
import MovieInfo from "../pages/Movie/MovieInfo";
import MovieWatch from "../pages/Movie/MovieWatch";
import Search from "../pages/Search";
import TVInfo from "../pages/TV/TVInfo";
import TVWatch from "../pages/TV/TVWatch";
import About from "../pages/About";
import History from "../pages/History";

const DESC_SUFFIX = "description - length <= 160 chars.";
const TITLE_SUFFIX = "| Hot TV-Show/Movie Watching Website";
export const routes = [
  {
    path: "/",
    name: "Home",
    Component: Home,
    metaInfo: {
      title: `Moonlight | Watch Films You Like`,
      description: `Moonlight | Hot TV-Show/Movie Watching Website`,
    },
  },
  {
    path: "/movie/:name/:id",
    name: "Phim",
    Component: MovieInfo,
    metaInfo: {
      title: `Phim ${TITLE_SUFFIX}`,
      description: `Phim ${DESC_SUFFIX}`,
    },
  },
  {
    path: "/movie/:name/:id/watch",
    name: "Xem phim",
    Component: MovieWatch,
    metaInfo: {
      title: `Xem phim ${TITLE_SUFFIX}`,
      description: `Xem phim ${DESC_SUFFIX}`,
    },
  },
  // {
  //   path: "/tv/:id",
  //   name: "tv",
  //   Component: TVInfo,
  //   metaInfo: {
  //     title: `tv ${TITLE_SUFFIX}`,
  //     description: `tv ${DESC_SUFFIX}`,
  //   },
  // },
  // {
  //   path: "/tv/:id/watch",
  //   name: "TVWatch",
  //   Component: TVWatch,
  //   metaInfo: {
  //     title: `TVWatch ${TITLE_SUFFIX}`,
  //     description: `TVWatch ${DESC_SUFFIX}`,
  //   },
  // },
  {
    path: "explore",
    name: "explore",
    Component: Explore,
    metaInfo: {
      title: `Explore ${TITLE_SUFFIX}`,
      description: `explore ${DESC_SUFFIX}`,
    },
  },
  {
    path: "search",
    name: "search",
    Component: Search,
    metaInfo: {
      title: `Search ${TITLE_SUFFIX}`,
      description: `search ${DESC_SUFFIX}`,
    },
  },
  // {
  //   path: "auth",
  //   name: "auth",
  //   Component: Auth,
  //   metaInfo: {
  //     title: `Auth ${TITLE_SUFFIX}`,
  //     description: `auth ${DESC_SUFFIX}`,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   Component: About,
  //   metaInfo: {
  //     title: `About ${TITLE_SUFFIX}`,
  //     description: `About ${DESC_SUFFIX}`,
  //   },
  // },
];

export const getRouteMetaInfo = (name) => {
  const route = routes.find((r) => r.name === name);
  return route?.metaInfo ?? {};
};

export const isLocationValidRoute = (pathname) => {
  return routes.some((r) => r.path === pathname);
};
