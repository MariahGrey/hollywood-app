module.exports = db => {
  const type = db.type;

  const Movie = db.createModel("Movie", {
    title: type.string().required(),
    poster: type.string().required(),
    summary: type.string().required(),
    rottenTomatoes: type
      .number()
      .min(0)
      .max(100),
    rating: type
      .string()
      .enum(["G", "PG", "PG13", "R", "NR"])
      .required()
  });
  return Movie;
};
