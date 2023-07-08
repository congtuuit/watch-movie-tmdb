import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import SearchBox from "../components/Common/SearchBox";
import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Footer/Footer";
import MainHomeFilms from "../components/Home/MainHomeFilm";
import RecommendGenres from "../components/Home/RecommendGenres";
import TrendingNow from "../components/Home/TrendingNow";
import { getHomeMovies, getHomeTVs, getMovieBannerInfo, getTVBannerInfo } from "../services/home";
import { useAppSelector } from "../store/hooks";
import MetaInfoContainer from "../containers/MetaInfoContainer";

const Home = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [currentTab, setCurrentTab] = useState("tv");
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [parent] = useAutoAnimate();

  const {
    data: dataMovie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
    error: errorMovie,
  } = useQuery(["home-movies"], getHomeMovies);

  const {
    data: dataMovieDetail,
    isLoading: isLoadingMovieDetail,
    isError: isErrorMovieDetail,
    error: errorMovieDetail,
  } = useQuery(["detailMovies", dataMovie?.Trending], () => getMovieBannerInfo(dataMovie?.Trending ?? []), {
    enabled: !!dataMovie?.Trending,
  });

  const {
    data: dataTV,
    isLoading: isLoadingTV,
    isError: isErrorTV,
    error: errorTV,
  } = useQuery(["home-tvs"], getHomeTVs);

  const {
    data: dataTVDetail,
    isLoading: isLoadingTVDetail,
    isError: isErrorTVDetail,
    error: errorTVDetail,
  } = useQuery(["detailTvs", dataTV?.Trending], () => getTVBannerInfo(dataTV?.Trending ?? []), {
    enabled: !!dataTV?.Trending,
  });

  //if (isErrorMovie) return <p>isErrorMovie: {errorMovie.message}</p>;

  if (isErrorMovieDetail) return <p>isErrorMovieDetail: {errorMovieDetail.message}</p>;

  if (isErrorTV) return <p>isErrorTV: {errorTV.message}</p>;

  if (isErrorTVDetail) return <p>isErrorTVDetail: {errorTVDetail.message}</p>;

  return (
    <>
      <MetaInfoContainer pageName="Home" />
      <div className="flex md:hidden justify-between items-center px-5 my-5">
        <Link to="/" className="flex gap-2 items-center">
          <LazyLoadImage src="/logo.png" className="h-10 w-10 rounded-full object-cover" />
          <p className="text-xl text-white font-medium tracking-wider uppercase">
            Moon<span className="text-primary">light</span>
          </p>
        </Link>
        <button onClick={() => setIsSidebarActive((prev) => !prev)}>
          <GiHamburgerMenu size={25} />
        </button>
      </div>

      <div className="flex items-start">
        <Sidebar onCloseSidebar={() => setIsSidebarActive(false)} isSidebarActive={isSidebarActive} />
        <div
          ref={parent}
          className="flex-grow md:pt-7 pt-0 pb-7 border-x md:px-[2vw] px-[4vw] border-gray-darken min-h-screen"
        >
          {/* <div className="flex justify-between md:items-end items-center">
            <div className="inline-flex gap-[40px] pb-[14px] border-b border-gray-darken relative">
              <button
                onClick={() => {
                  setCurrentTab("tv");
                  localStorage.setItem("currentTab", "tv");
                }}
                className={`${
                  currentTab === "tv" &&
                  "text-white font-medium after:absolute after:bottom-0 after:left-[13%] after:bg-white after:h-[3px] after:w-5"
                } transition duration-300 hover:text-white`}
              >
                TV Show
              </button>
              <button
                onClick={() => {
                  setCurrentTab("movie");
                  localStorage.setItem("currentTab", "movie");
                }}
                className={`${
                  currentTab === "movie" &&
                  "text-white font-medium after:absolute after:bottom-0 after:right-[9%] after:bg-white after:h-[3px] after:w-5"
                } transition duration-300 hover:text-white`}
              >
                Movie
              </button>
            </div>
            <div className="flex gap-6 items-center">
              <p>{currentUser?.displayName || "Anonymous"}</p>
              <LazyLoadImage
                src={currentUser ? currentUser.photoURL : "/defaultAvatar.jpg"}
                alt="User avatar"
                className="w-7 h-7 rounded-full object-cover"
                effect="opacity"
                referrerPolicy="no-referrer"
              />
            </div>
          </div> */}

          <MainHomeFilms
            data={dataMovie}
            dataDetail={dataMovieDetail}
            isLoadingBanner={isLoadingMovieDetail}
            isLoadingSection={isLoadingMovie}
          />
        </div>

        <div className="shrink-0 max-w-[310px] w-full hidden lg:block px-6 top-0 sticky ">
          <SearchBox />
          <RecommendGenres currentTab={currentTab} />
          <TrendingNow />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
