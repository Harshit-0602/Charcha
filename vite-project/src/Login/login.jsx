import { useState } from "react";
import "./login.css";
import axios from "axios";

const Field = ({ f, input, setter }) => {
  return (
    <div className="Email">
      <input
        type="text"
        placeholder={f}
        onChange={(e) => {
          setter(e.target.value);
          console.log(input);
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
          Already Registered ? <a href="">LOGIN</a>
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
          Create New Account ... <a href="">SIGN UP</a>
        </span>
      </div>
    </>
  );
};

const submitFunc = (check,username, email, password) =>
{
  if (check) {
    const send = {
      email,
      password
    };
    axios.post("/user/login", send)
      .then(res => {
      console.log(res.data);
      })
      .catch(err => {
      console.log(err);
    })
  }
  else {
    const send = {
      username,
      email,
      password,
    };
    axios
      .post("/user/register", send)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const LoginPage = ({ check = false }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="entrance">
        <div className="welcome">
          <h1>Welcome</h1>
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
            <button type="submit" onClick={()=>submitFunc(check,username,email,password)}>
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
