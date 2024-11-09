import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import MoviesList from "./Routes/MoviesList";
import { getComingSoon, getNowPlaying, getPopular } from "./api";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route
          path={["/coming-soon", "/coming-soon/movies/:movieId"]}
        >
          <MoviesList
            queryFn={getComingSoon}
            queryKey={["movie", "coming-soon"]}
          />
        </Route>
        <Route
          path={["/now-playing", "/now-playing/movies/:movieId"]}
        >
          <MoviesList
            queryFn={getNowPlaying}
            queryKey={["movie", "now-playing"]}
          />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <MoviesList
            queryFn={getPopular}
            queryKey={["movie", "popular"]}
          />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
