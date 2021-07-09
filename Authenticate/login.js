import jwt from "jsonwebtoken";
import { user } from "../module/userSignup";
import bcrypt from "bcrypt";
import { LoginInfo } from "../module/loginInfo";
import moment from 'moment';

export const login = async (req, res) => {
  try {
    let flag;
    const data = req.body.user;
     console.log("email", data);
    let token;
    const userData = await user.findOne({ email: data.email });
    // console.log("User data available", userData);
    if (userData) {
      flag = false;
      const hash = userData.password;
      await bcrypt.compare(
        data.password,
        hash,
        async function (error, isMatch) {
          try {
            if (isMatch && userData.isActivated === true) {
              token = jwt.sign({ data }, process.env.ACTIVATE_KEY, {
                expiresIn: "8h",
              });
            } else if (isMatch && userData.isActivated === false) {
              return res.status(400).json({ msg: "User is not activated" });
            } else if (!isMatch) {
              return res
                .status(400)
                .json({ msg: "Username or password incorrect" });
            }

			let storeLoginInfo = await LoginInfo.findOne({email:userData.email});
			const payload = {email:userData.email, dateOfLogin: (moment().format()).add(1,day), device: data.device}
			console.log(payload);
			if(storeLoginInfo){
				storeLoginInfo = await LoginInfo.findOneAndUpdate({email:userData.email}, payload)
				console.log("Update", storeLoginInfo);
			} else{				
				storeLoginInfo = await LoginInfo.create(payload);
				console.log("Create", storeLoginInfo);
			}
			// console.log(storeLoginInfo);
            return res
              .status(200)
              .json({ token, msg: "user logged in successfully", flag, storeLoginInfo });
          } catch (error) {
            console.log("error", error);
            return res.status(500).send(error);
          }
        }
      );
    } else{
		return res.status(404).json({msg:"User not found"})
	}
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};
