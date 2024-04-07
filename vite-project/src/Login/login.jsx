import { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { Link,NavLink,useNavigate } from "react-router-dom";
const Field = ({ f, input, setter }) => {
  return (
    <div className="Email">
      <input
        type="text"
        placeholder={f}
        onChange={(e) => {
          setter(e.target.value);
          // console.log(input);
        }}
      />
    </div>
  );
};
const RedirectSignIN = () => {
  return (
    <>
      <div className="redirectText">
        <span>
          Already Registered ? <NavLink to="/login" className="redirect">LOGIN</NavLink>
        </span>
      </div>
    </>
  );
};
const RedirectSignUp = () => {
  return (
    <>
      <div className="redirectText">
        <span>
          Create New Account ... <NavLink to="/" className="redirect">SIGN UP</NavLink>
        </span>
      </div>
    </>
  );
};

const submitFunc = (check,username, email, password,navigate) =>
{
  if (check) {
    const send = {
      email,
      password
    };
    axios
      .post("/user/login", send)
      .then(() => {
        navigate("/home");  
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    const send = {
      username,
      email,
      password,
    };
    axios
      .post("/user/register", send)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// const TypingEffect = () => {
//   const [text, setText] = useState("");
//   const fullText = "Welcome to CHARCHA ! Your Private Messenger";
//   useEffect(() => {
//     let currentIndex = 0;
//     const interval = setInterval(() => {
//       if (currentIndex < fullText.length) {
//         setText((prevText) => prevText + fullText[currentIndex]);
//         currentIndex++;
//       } else {
//         clearInterval(interval); // Clear interval when done typing
//       }
//     }, 50); // Adjust speed as needed

//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <h1>{text}</h1>
//   );
// }

const LoginPage = ({ check = false }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  return (
    <>
      <div className="entrance">
        <div className="welcome">
          <h1>
            Welcome to <span>CHARCHA</span> ! Your Private Messenger
          </h1>
        </div>
        <div className="Register">
          <div className="login">
            {/* if(check==false) */}
            {check == false ? (
              <>
                <h1>SIGN UP</h1>
                <Field f={"Username"} input={username} setter={setUsername} />
              </>
            ) : (
              <h1>LOG IN</h1>
            )}
            <Field f={"Email"} input={email} setter={setEmail} />
            <Field f={"Password"} input={password} setter={setPassword} />
            <button
              type="submit"
              onClick={() =>
                submitFunc(check, username, email, password, navigate)
              }
            >
              SUBMIT <span>→</span>
            </button>
            {check == false ? <RedirectSignIN /> : <RedirectSignUp />}
          </div>
        </div>
      </div>
    </>
  );
};

export { LoginPage };
