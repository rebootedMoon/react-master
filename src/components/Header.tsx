import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate("/about");
  };
  const onHomeClick = () => {
    navigate("/");
  };

  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
          <button onClick={onHomeClick}>Home</button>
        </li>
        <li>
          {/* <Link to={"/about"}>About</Link> */}
          <button onClick={onAboutClick}>About</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
