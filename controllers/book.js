const bookSchema = require("../models/bookSchema");

const post = async (request, response, next) => {
  const { name, author } = request.body;
  const schemaCheck = new bookSchema({ name, author });
  const saving = await schemaCheck.save();
  response.send(saving);
};

const get = async (request, response, next) => {
  try {
    const users = await bookSchema.find({});
    response.status(201).send(users);
  } catch (error) {
    response.send(400);
  }
};
const getById = async (request, response, next) => {
  const getSpecificUser = await bookSchema.findById({ _id: request.params.id });
  response.send(getSpecificUser);
};
const update = async (request, response, next) => {
  const { name, author } = request.body;
  const updated = await bookSchema.findByIdAndUpdate(
    { _id: request.params.id },
    { name, author },
    { new: true }
  );
  response.send(updated);
};

const deleted = async (request, response, next) => {
  const deletdUser = await bookSchema.findByIdAndDelete({
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
