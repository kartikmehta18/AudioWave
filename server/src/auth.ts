import { Router, Request, Response } from "express";
import { client } from "./stream-client";
import { UserRequest } from "@stream-io/node-sdk";

const router = Router();

router.post("/createUser", async (req: Request, res: Response) => {
  try {
    const { username, name, image } = req.body;

    if (!username || !name || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser: UserRequest = {
      id: username,
      role: "user",
      name,
      image,
    };

    // Upsert the user in Stream
    await client.upsertUsers([newUser]);

    // Generate a token with expiry (24 hours)
    const expiry = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    const token = client.createToken(username, expiry);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: { username, name, token },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
    });
  }
});

export default router;
// import { Router, Request, Response } from "express";
// import { client } from "./stream-client";
// import { UserRequest } from "@stream-io/node-sdk";

// const router = Router();

// router.post("/createUser", async (req: Request, res: Response) => {
//   try {
//     const { username, name, image } = req.body;

//     // Validate input
//     if (!username || !name || !image) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Ensure username is a valid string
//     if (typeof username !== "string" || username.trim() === "") {
//       return res.status(400).json({ message: "Invalid username provided" });
//     }

//     const newUser: UserRequest = {
//       id: username, // Ensure the username is a valid identifier
//       role: "user",
//       name,
//       image,
//     };

//     // Upsert the user in Stream
//     await client.upsertUsers([newUser]);

//     // Generate a token for the user
//     const token = client.createToken(username); // Use createToken for user tokens

//     return res.status(200).json({
//       success: true,
//       message: "User created successfully",
//       data: { username, name, token },
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the user",
//     });
//   }
// });

// export default router;
