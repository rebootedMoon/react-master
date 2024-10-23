import { Link } from "react-router-dom";
import { users } from "../db";
function Home() {
  // const users: any = [];
  return (
    <div>
      <h1> User</h1>
      <ul>
        {users.map((user) => (
          // <li key={user.id}> {user.name}</li>
          <li key={user.id}>
            <Link to={`/users/${user.id}`}> {user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;
