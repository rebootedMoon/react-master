import { useRouteError } from "react-router-dom";

function ErrorComponent() {
  let error = useRouteError();
  console.log(error);
  return <h1> This component crashed</h1>;
}
export default ErrorComponent;
