import { TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { selectUser } from "app/store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";
import { setUser } from "app/store/userSlice";
import FusePageSimple from "@fuse/core/FusePageSimple/FusePageSimple";

export default function Profile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.data.email);
  const [coinbaseAccount, setCoinbaseAccount] = useState(
    user.data.coinbaseAccount
  );
  const [paypalAccount, setPaypalAccount] = useState(user.data.paypalAccount);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    await axios.post("api/profile/changePassword", {
      id: user.data.id,
      password,
    });
    dispatch(showMessage({ message: "Password changed successfully." }));
    setPassword("");
  };
  const handleChangeEmail = async (e) => {
    e.preventDefault();
    const response = await axios.post("api/profile/changeEmail", {
      id: user.data.id,
      email,
    });
    dispatch(setUser(response.data.user));
    dispatch(showMessage({ message: "Email changed successfully." }));
  };
  const handleChangePayment = async (e) => {
    e.preventDefault();

    const response = await axios.post("api/profile/changePayment", {
      id: user.data.id,
      coinbaseAccount,
      paypalAccount,
    });
    dispatch(setUser(response.data.user));
    dispatch(showMessage({ message: "Payment changed successfully." }));
  };
  return (
    <FusePageSimple
      header={
        <div className="mt-20 flex justify-center items-center text-[40px]">
          Profile
        </div>
      }
      content={
        <div className="p-20 w-full">
          <div className="mt-24 mb-16">
            <Typography className="mb-24 font-medium text-20">
              Username:
            </Typography>
            <TextField
              value={user?.data.name}
              label="Username"
              variant="outlined"
              disabled
              fullWidth
            />
          </div>
          <div className="mt-24 mb-16">
            <form onSubmit={handleChangePassword}>
              <Typography className="mb-24 font-medium text-20">
                Password:
              </Typography>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type="password"
                inputProps={{ minLength: 8 }}
                variant="outlined"
                required
                fullWidth
              />
              <Button
                className="mt-8"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Change Password
              </Button>
            </form>
          </div>

          <div className="mt-24 mb-16">
            <form onSubmit={handleChangeEmail}>
              <Typography className="mb-24 font-medium text-20">
                Email:
              </Typography>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                type="email"
                variant="outlined"
                required
                fullWidth
              />
              <Button
                className="mt-8"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Change Email
              </Button>
            </form>
          </div>
          <div className="mt-24 mb-16">
            <Typography className="mb-24 font-medium text-20">
              Product Number:
            </Typography>
            <TextField
              value={user?.data.productNumber}
              label="Product Number"
              variant="outlined"
              disabled
              fullWidth
            />
          </div>
          <Typography className="mt-24 font-medium text-20">
            Payment:
          </Typography>
          <form onSubmit={handleChangePayment}>
            <div className="mt-12 mb-16">
              <Typography className="my-12 font-medium text-14">
                Coinbase Account:
              </Typography>
              <TextField
                onChange={(e) => setCoinbaseAccount(e.target.value)}
                value={coinbaseAccount}
                label="Coinbase Account"
                variant="outlined"
                fullWidth
              />
              <Typography className="my-12 font-medium text-14">
                Paypal Account:
              </Typography>
              <TextField
                onChange={(e) => setPaypalAccount(e.target.value)}
                value={paypalAccount}
                label="Paypal Account"
                variant="outlined"
                fullWidth
              />
              <Button
                className="mt-12"
                color="secondary"
                variant="outlined"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Change Payment
              </Button>
            </div>
          </form>
        </div>
      }
    ></FusePageSimple>
  );
}
