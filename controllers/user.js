const userSchema = require("../models/userSchema");

const post = async (request, response, next) => {
  const { name, age } = request.body;
  const schemaCheck = new userSchema({ name, age });
  const saving = await schemaCheck.save();
  response.send(saving);

  
};

const get = async (request, response, next) => {
  try {
    const users = await userSchema.find({});
    response.status(201).send(users);
  } catch (error) {
    response.send(400);
  }
};
const getById = async (request, response, next) => {
  const getSpecificUser = await userSchema.findById({ _id: request.params.id });
  response.send(getSpecificUser);
};
const update = async (request, response, next) => {
  const { name, age } = request.body;
  const updated = await userSchema.findByIdAndUpdate(
    { _id: request.params.id },
    { name, age },
    { new: true }
  );
  response.send(updated);
};

const deleted = async (request, response, next) => {
  const deletdUser = await userSchema.findByIdAndDelete({
    _id: request.params.id,
  });
  response.send(deletdUser);
};

module.exports = {
  post,
  get,
  getById,
  update,
  deleted
};
