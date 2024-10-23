import { useParams } from "react-router-dom";
import { users } from "../db";
export default function User() {
  const { userId } = useParams();
  console.log(userId);
  return (
    <h1>
      User with it {userId} is named {users[Number(userId) - 1].name}
    </h1>
  );
}
