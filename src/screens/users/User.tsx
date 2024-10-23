import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";
export default function User() {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>
      <h1>
        User with it {userId} is named{" "}
        {users[Number(userId) - 1].name}
      </h1>
      <Link to="followers"> See Followers</Link>
      <Outlet />
    </div>
  );
}
