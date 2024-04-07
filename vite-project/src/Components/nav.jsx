import "./nav.css"

const Nav = ({ user}) => {
    console.log(user);
    return (
        <div className="navbar">
            <div className="profilePhoto"></div>
            <div className="profileName">{user?.username }</div>
        </div>
    );
}

export { Nav };