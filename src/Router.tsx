import { BrowserRouter, Switch, Route } from "react-router-dom";

import Detail from "./routes/Detail";
import Home from "./routes/Home";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/character/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
