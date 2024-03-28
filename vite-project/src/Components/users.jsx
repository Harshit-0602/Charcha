import "./users.css";

const User = ({ user }) => {
  console.log(user);
  return (
    <div className="user">
      <div className="userPhoto"></div>
      <div className="username">
        <span>{user.username }</span>
      </div>
    </div>
  );
};

const Users = ({allUsers}) => {
  
  return (
    <>
      <div className="users">
        {
          allUsers.map((user) => (
            <User key={user._id} user={user} />
          ))
        }
      </div>
    </>
  );
};

export { User, Users };
