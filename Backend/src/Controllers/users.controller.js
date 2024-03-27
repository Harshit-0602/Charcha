import { User } from "../Models/users.model.js";

const option = {
  httpOnly: true,
  secure: true,
};
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.json({ message: "All fields are required" });
      return;
    }
    console.log("All fields are available");
    const userExist = await User.findOne({ email });
    if (userExist) {
      // const savedUser=await User.findByIdAndUpdate(
      //   { _id: userExist._id },
      //   {
      //     $set: {
      //     "chats.Gaurav":"1"
      //     }
      //   },
      //   {
      //     new: true,
      //   }
      // )
      // userExist.chats["Priyanshu"] = "1";
      // console.log(userExist);
      // await userExist.save()
      //   .then(savedUser => {
      //     return User.findById(savedUser._id);
      //   })
      //   .then(foundUser => {
      //     console.log(foundUser);
      //     res.json({
      //       message: "User Already Exists . Try Logging In",
      //       user: foundUser,
      //     });
      // })
      // const savedUser = await User.findById(userExist._id);
      // console.log(savedUser);
      res.json({
        message: "User Already Exists . Try Logging In",
        user: userExist,
      });
      return;
    }
    console.log("New user found");
    const user = await User.create({
      username,
      email,
      password,
    });
    res.json({ message: "User Registered Successfully ! ", user });
  } catch (error) {
    res.json({
      Error: `Error has occured while registering the user ${error}`,
    });
  } finally {
    console.log("Registration Function Executed ");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "User Not Registered !!" });
      return;
    }
    if (!(await user.isPasswordCorrect(password))) {
      res.json({ message: "Wrong Password" });
      return;
    }
    const token = user.generateAccessToken();
    res
      .cookie("accessToken", token, option)
      .json({ message: "User Logged In Successfully !!" });
  } catch (error) {
    res.json({
      Error: `Error has occured while registering the user ${error}`,
    });
  } finally {
    console.log("Log In Successfull");
  }
};

export { register, login };
