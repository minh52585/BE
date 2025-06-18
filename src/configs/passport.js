import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

//

// Serialize & Deserialize (cho session, nếu cần)
passport.serializeUser((user, done) => {
  done(null, user.id); // chỉ lưu user._id vào session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// ================== GOOGLE STRATEGY ==================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8888/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || "";
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Nếu chưa có googleId → tìm theo email
          user = await User.findOne({ email });

          if (user) {
            // Nếu đã tồn tại user với email đó, cập nhật googleId
            user.googleId = profile.id;
            await user.save();
          } else {
            // Nếu chưa có ai dùng email này → tạo mới user
            user = await User.create({
              fullname: profile.displayName,
              email,
              googleId: profile.id,
              avatar: profile.photos?.[0]?.value || "",
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// // ================== FACEBOOK STRATEGY ==================
// ================== FACEBOOK STRATEGY ==================
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:8888/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"], // Quan trọng để lấy email
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || "";
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          user = await User.findOne({ email });

          if (user) {
            // Nếu đã có user với email này, chỉ cập nhật thêm facebookId
            user.facebookId = profile.id;
            await user.save();
          } else {
            // Nếu chưa có ai dùng email này, tạo user mới
            user = await User.create({
              fullname: profile.displayName,
              email,
              facebookId: profile.id,
              avatar: profile.photos?.[0]?.value || "",
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// // ================== GITHUB STRATEGY ==================
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//       scope: ["user:email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ githubId: profile.id });
//         if (!user) {
//           user = await User.create({
//             fullname: profile.displayName || profile.username,
//             email: profile.emails?.[0]?.value || "",
//             githubId: profile.id,
//             avatar: profile.photos?.[0]?.value || "",
//           });
//         }
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

// export default passport;
