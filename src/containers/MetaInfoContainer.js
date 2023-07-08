import MetaInfo from "../components/MetaInfo";
import { getRouteMetaInfo } from "../config/routes.config";

const MetaInfoContainer = (props) => {
  const { pageName } = props;
  return <MetaInfo {...getRouteMetaInfo(pageName)} />;
};

export default MetaInfoContainer;
