import "./users.css";

const User = () => {
  return (
    <div className="user">
      <div className="userPhoto"></div>
      <div className="userName">
        <span>USER 1</span>
      </div>
    </div>
  );
};

const Users = () => {
  return (
    <>
      <div className="users">
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
    </>
  );
};

export { User, Users };
