
export const SortReview = (
  reviews,
  type = "asc"
) => {
  if (type === "asc") {
    return reviews
      .slice()
      .sort((a, b) => a.author_details.rating - b.author_details.rating);
  } else if (type === "desc") {
    return [...reviews].sort(
      (a, b) => b.author_details.rating - a.author_details.rating
    );
  } else {
    return reviews;
  }
};
