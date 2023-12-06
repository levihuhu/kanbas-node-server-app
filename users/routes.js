import * as dao from "./dao.js";

//let currentUser = null;


function UserRoutes(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);

  };

  const account = async (req, res) => {
    res.json(req.session['currentUser']);

  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };


  const findByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };
  const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.json(user);
  };

  const findUsersByRole = async (req, res) => {
    const role = req.params.role;
    const users = await dao.findUsersByRole(role);
    res.json(users);
  };

   const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };


  const updateUser = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateUser(id, req.body);
    const currentUser = await dao.findUserById(id);
    req.session['currentUser'] = currentUser;

    res.json(status);
  };

  const updateFirstName = async (req, res) => {
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status = await dao.updateUser(id, { firstName: newFirstName });
    res.json(status);
  };
  
const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
};


 
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;

    res.json(currentUser);
  };


  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;

    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();

    res.json(200);
  };


 

  app.post("/api/users/signout", signout);
  app.post("/api/users/signin", signin);
  app.post("/api/users/account", account);
  app.post("/api/users", createUser);
  app.post("/api/users/signup", signup);


  app.delete("/api/users/:userId", deleteUser);

  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
  
  app.get("/api/users/role/:role", findUsersByRole);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/username/:username", findByUsername);
  app.get("/api/users/credentials/:username/:password", findUserByCredentials);
  app.put("/api/users/:id", updateUser);
}

export default UserRoutes;