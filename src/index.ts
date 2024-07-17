import express, { Request, Response } from "express";

import { fsService } from "./fsService";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function emailValidator(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function passwordValidator(password) {
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwordRegex.test(password);
}

let users = [];
fsService.usersFromFile().then((data) => {
  users = data;
});

app.get("/users", (req: Request, res: Response) => {
  try {
    res.json(users);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
app.get("/users/:userId", (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userId);
    const user = users.find((user) => user.id === userID);
    if (!user) {
      return res.status(404).json("user not found");
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
});
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const index = users.findIndex((user) => user.email === email);
    if (!name || !email || !password) {
      res.status(400).json("Object error");
    } else if (index !== -1) {
      return res.status(409).json("user with this email already exists");
    } else if (!emailValidator(email)) {
      res.status(400).json("Invalid email");
    } else if (!passwordValidator(password)) {
      res.status(400).json("Invalid password");
    } else {
      const newUser = {
        id: users[users.length - 1].id + 1,
        name,
        email,
        password,
      };
      users.push(newUser);
      await fsService.usersToFile(users);
      res.status(201).json(newUser);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
});
app.put("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userId);
    const user = users.find((user) => user.id === userID);
    const { name, email, password } = req.body;
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
      return res.status(409).json("user with this email already exists");
    } else {
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
      if (name) {
        user.name = name;
      }
      await fsService.usersToFile(users);
      res.status(201).json(user);
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
});
app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userID = Number(req.params.userId);
    const index = users.findIndex((user) => user.id === userID);
    if (index === -1) {
      return res.status(404).json("user not found");
    } else {
      users.splice(index, 1);
      await fsService.usersToFile(users);
      res.status(204).json("user deleted");
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
});
fsService.usersFromFile().then(() => {
  app.listen(3000, () => {
    console.log("server is");
  });
});
