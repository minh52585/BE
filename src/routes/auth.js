import { Router } from "express";
import passport from "passport";
import authController from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// === Local Auth ===
router.post("/register", authController.register);
router.post("/login", authController.login);

// === Middleware: Đảm bảo đã login
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

// === Google OAuth ===
router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login With Google</a>");
});

router.get("/auth/google",
  passport.authenticate("google", { scope: ['profile', 'email'] })
);

router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: '/' }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// === Profile protected route ===
router.get("/profile", ensureAuthenticated, (req, res) => {
  res.send(`Welcome ${req.user.fullname || req.user.displayName}`);
});

// === Logout ===
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// // Facebook OAuth
// router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", { session: false, failureRedirect: "/login" }),
//   authController.oauthCallback
// );

// // GitHub OAuth
// router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
// router.get(
//   "/github/callback",
//   passport.authenticate("github", { session: false, failureRedirect: "/login" }),
//   authController.oauthCallback
// );

// === Forgot / Reset Password ===
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

// === User Management ===
router.get("/users", verifyToken, authController.getAllUsers);
router.get("/users/:id", verifyToken, authController.getUserById);
router.put("/users/:id", verifyToken, authController.updateUser);
router.delete("/users/:id", verifyToken, isAdmin, authController.deleteUser);

export default router;
