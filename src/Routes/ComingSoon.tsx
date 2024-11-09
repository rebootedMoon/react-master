import { useLocation } from "react-router-dom";

function ComingSoon() {
  const location = useLocation();
  console.log(location);
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return null;
}
export default ComingSoon;
