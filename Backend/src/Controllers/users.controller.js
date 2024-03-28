import { User } from "../Models/users.model.js";
import { upload } from "../middlewares/multer.middleware.js";

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
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
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

const logout = async (req, res) => {
  try {
    console.log("Logging out");
    res
      .status(200)
      .clearCookie("accessToken", option)
      .json({ msg: "User Logged Out Successfully ! ", user: req.user });
  } catch (error) {
    console.log("Error While Logging Out " + error);
  }
};

const uploadProfilePic = async (req, res) => {
  try {
    upload.single("profileImage")(req, res, async (err) => {
      if (err) {
        res
          .status(400)
          .json({ msg: "Error while uploading profile image " + err });
        return;
      }
      console.log("Uploading .........");
      // console.log(req.file);
      const base64image = req.file.buffer.toString("base64");
      // console.log(base64image);
      // return;r
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: {
            profileImage: base64image,
          },
        },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ msg: "Proile Image Uploaded Successfully !", user });
    });
  } catch (error) {
    console.log("Error While Executing Upload Function " + error);
  } finally {
    console.log("Upload Function Executed !");
  }
};

const fetchUsers = async (req, res) => {
  try {
    console.log("Fetching All the Users .......");

    //Case Insensetive Sorting

    const allUsers = await User.find()
      .collation({ locale: "en" })
      .sort({ username: 1 });
    // console.log(allUsers);
    res.json({
      users: allUsers,
      // currentUser: req.user,
    });
  } catch (error) {
    console.log("Error while fetching all the users..!!!");
  }
};

export { register, login, logout, uploadProfilePic, fetchUsers };
