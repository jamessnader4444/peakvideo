import express from "express";
import {
  getUsers,
  Login,
  Logout,
  Register,
  deleteUser,
  AccessWithToken,
  changePassword,
  changeEmail,
  changePayment,
} from "../controllers/Users.js";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/Categories.js";
import {
  addProduct,
  getProductsByCategory,
  getProductsByUser,
  getProduct,
  getNextRandomVideo,
} from "../controllers/Products.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  changeTopLeftLogo,
  getSiteInfo,
  changeMiddleLogo,
  changeLogoText,
  changeCompany,
  changeContact,
  changeBannerLogo,
  changeBannerEnable,
} from "../controllers/SiteInfo.js";

const router = express.Router();

router.post("/api/users", verifyToken, getUsers);
router.post("/api/users/delete", verifyToken, deleteUser);

router.post("/api/profile/changePassword", verifyToken, changePassword);
router.post("/api/profile/changeEmail", verifyToken, changeEmail);
router.post("/api/profile/changePayment", verifyToken, changePayment);

router.post("/api/categories", verifyToken, getCategories);
router.post("/api/categories/all", getAllCategories);
router.post("/api/categories/delete", verifyToken, deleteCategory);
router.post("/api/categories/add", verifyToken, addCategory);
router.post("/api/categories/update", verifyToken, updateCategory);

router.post("/api/products/add", verifyToken, addProduct);
router.post("/api/productsByCategory", getProductsByCategory);
router.post("/api/productsByUser", getProductsByUser);
router.post("/api/products/get", getProduct);
router.post("/api/products/getNextRandomVideo", getNextRandomVideo);

router.post("/api/auth/sign-up", Register);
router.post("/api/auth/sign-in", Login);
router.post("/api/auth/access-token", AccessWithToken);

router.post("/api/site_info", getSiteInfo);
router.post("/api/site_info/changeTopLeftLogo", verifyToken, changeTopLeftLogo);
router.post("/api/site_info/changeMiddleLogo", verifyToken, changeMiddleLogo);
router.post("/api/site_info/changeContact", verifyToken, changeContact);
router.post("/api/site_info/changeCompany", verifyToken, changeCompany);
router.post("/api/site_info/changeBannerLogo", verifyToken, changeBannerLogo);
router.post(
  "/api/site_info/changeBannerEnable",
  verifyToken,
  changeBannerEnable
);
router.post("/api/site_info/changeLogoText", verifyToken, changeLogoText);

router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
