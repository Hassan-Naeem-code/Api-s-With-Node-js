const bcrypt = require("bcrypt");
const authSchema = require("../models/authSchema");
const jwt = require("jsonwebtoken");
const app = require("express")()
const register = async (request, response, next) => {
  const { name, email, password } = request.body;

  if ((!name, !email, !password))
    return response.status(400).send({ message: "invalid input" });

  const hassedPassword = await bcrypt.hash(password, 10);

  const oldEmail = await authSchema.exists({ email });

  // if(oldEmail)  return response.status(400).send({message : "email is taken"})

  const SchemaCheck = new authSchema({ name, email, password: hassedPassword });

  const auth = await SchemaCheck.save();
  const user = { id: auth._id };
  const token = jwt.sign(user, "hassan", { expiresIn: "7d" });
  
  response.status(201).send({ user: auth, token });
};

const login = async (request, response, next) => {
  const { email, password } = request.body;
  
  if ((!email, !password))
  return response.status(400).send({ message: "invalid input" });
  
  const user = await authSchema.findOne({ email });
  
  if (!user) return response.status(400).send({ message: "invalid account" });
  
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword)
  return response.status(400).send({ message: "wrong password" });
  
  const info = { id: user._id };
  const token = jwt.sign(info, "hassan", { expiresIn: "7d" });
  
  response.send({user , token});

};


const verify = async (request, response, next) => {
  const id =  request.id

  const user = await authSchema.findOne({_id : id})
  response.send(user)

};  

const update = async (request, response, next) => {
  const { name, age } = request.body;
  const updated = await authSchema.findByIdAndUpdate(
    { _id: request.params.id },
    { name, age },
    { new: true }
  );
  response.send(updated);
};

const deleted = async (request, response, next) => {
  const deletdUser = await authSchema.findByIdAndDelete({
    _id: request.params.id,
  });
  response.send(deletdUser);
};

module.exports = {
  register,
  login,
  verify,
  update,
  deleted,
};
