module.exports = db => {
  const type = db.type;

  const Actor = db.createModel("Actor", {
    age: type.number().required(),
    name: type.string().required(),
    gender: type
      .string()
      .enum(["Female", "Male"])
      .required()
  });
  return Actor;
};
