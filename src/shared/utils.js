import { EMBED_TO, IMAGE_URL } from "./constants";

export const resizeImage = (imageUrl, width = "original") => `${IMAGE_URL}/${width}${imageUrl}`;

// export const embedMovie = (id) =>
//   `${EMBED_URL}/movie?tmdb=${id}`;

// export const embedMovie = (id) => `${EMBED_VIDSRC}/${id}`;

export const embedMovie = (id) => `${EMBED_TO}/${id}`;

// export const embedTV = (id, season, episode) =>
//   `${EMBED_URL}/series?tmdb=${id}&sea=${season}&epi=${episode}`;

// export const embedTV = (id, season, episode) =>
//   `${EMBED_VIDSRC}/${id}/${season}-${episode}`;

export const embedTV = (id, season, episode) => `${EMBED_TO}/tv?id=${id}&s=${season}&e=${episode}`;

export const calculateTimePassed = (time) => {
  const unit = {
    year: 12 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };

  const diff = Date.now() - time;
  for (const key in unit) {
    if (diff > unit[key]) {
      const timePassed = Math.floor(diff / unit[key]);
      return `${timePassed} ${key}${timePassed > 1 ? "s" : ""}`;
    }
  }

  return "Just now";
};

export const convertErrorCodeToMessage = (errorCode) => {
  if (errorCode === "auth/email-already-in-use") return "Your email is already in use.";
  if (errorCode === "auth/user-not-found") return "Your email may be incorrect.";
  if (errorCode === "auth/wrong-password") return "Your password is incorrect.";
  if (errorCode === "auth/invalid-email") return "Your email is invalid";
  if (errorCode === "auth/too-many-requests") return "You request too many times!";
  return "Something weird happened.";
};

export const getRandomAvatar = () => {
  const avatars = [
    "https://i.ibb.co/zrXfKsJ/catface-7.jpg",
    "https://i.ibb.co/CJqGvY6/satthudatinh.jpg",
    "https://i.ibb.co/rd3PGq5/catface-9.png",
    "https://i.ibb.co/Htq4LWJ/catface-8.png",
    "https://i.ibb.co/9mPr2ds/catface-3.jpg",
    "https://i.ibb.co/b6TT6Y4/catface-6.jpg",
    "https://i.ibb.co/0pNx0nv/catface-4.jpg",
    "https://i.ibb.co/StzXrVH/catface.jpg",
    "https://i.ibb.co/KDdd4zN/catface-2.jpg",
    "https://i.ibb.co/stB42Nb/catface-5.jpg",
  ];

  return avatars[Math.floor(Math.random() * avatars.length)];
};

export const object2Array = (obj) => {
  if (!obj) {
    return [];
  }
  return Object.entries(obj);
};

export const createFriendlyNameURL = (input) => {
  if (!input) {
    return input;
  }

  let friendlyName = input
    ?.toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

  // Remove special characters and spaces
  let cleanedName = friendlyName.replace(/[^\w\s]/gi, "");

  // Convert to lowercase
  cleanedName = cleanedName.toLowerCase();

  // Replace spaces with hyphens
  cleanedName = cleanedName.replace(/\s+/g, "-");

  // Encode the resulting string
  const friendlyURL = encodeURI(cleanedName);

  return friendlyURL;
};

export const getMovieUrl = (film, name) => {
  if (name) {
    return `/movie/${createFriendlyNameURL(name)}/${film.id}`;
  }
  return `/movie/${createFriendlyNameURL(film?.title) || createFriendlyNameURL(film?.name)}/${film.id}`;
};

export const getMovieDetailUrl = (film, name) => {
  if (name) {
    return `/movie/${createFriendlyNameURL(name)}/${film.id}/watch`;
  }
  return `/movie/${createFriendlyNameURL(film?.title) || createFriendlyNameURL(film?.name)}/${film.id}/watch`;
};
