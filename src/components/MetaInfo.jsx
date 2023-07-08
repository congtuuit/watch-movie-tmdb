import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
const APP_NAME = process.env.REACT_APP_NAME;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTHOR_NAME = process.env.REACT_APP_AUTHOR;
const DEFAULT_LANG = process.env.REACT_APP_LANG;
const DEFAULT_LOCALE = process.env.REACT_APP_LOCALE;

const MetaInfo = (props) => {
  const {
    meta = [],
    defer = false,
    lang = DEFAULT_LANG,
    title = APP_NAME,
    locale = DEFAULT_LOCALE,
    description = "",
    image,
  } = props;
  const url = window?.location.href || "unknown";

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Helmet
      defer={defer}
      title={title}
      htmlAttributes={{ lang }}
      titleTemplate={`${APP_NAME} | %s`}
      link={[
        {
          rel: "canonical",
          href: url,
        },
      ]}
      meta={[
        {
          name: "title",
          content: title,
        },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:image",
          content: image ?? `${BASE_URL}preview.png`,
        },
        {
          property: "og:site_name",
          content: APP_NAME,
        },
        {
          property: "og:url",
          content: url,
        },
        {
          property: "og:locale",
          content: locale,
        },
        {
          name: "author",
          content: AUTHOR_NAME,
        },
      ].concat(meta)}
    />
  );
};

export default MetaInfo;
