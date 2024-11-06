import styled, { createGlobalStyle } from "styled-components";
import ToDoList from "./ToDoList";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./components/atom";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./components/Header";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
`;
const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
`;
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
