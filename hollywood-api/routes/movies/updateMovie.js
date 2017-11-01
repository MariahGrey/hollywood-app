module.exports = {
  path: "/api/movies/{movieId}",
  method: ["PUT", "PATCH"],
  handler: function(request, reply) {
    let movieId = request.params.movieId;
    let movie = request.payload;

    this.models.Movie
      .get(movieId)
      .then(doc => doc.merge(movie).save())
      .then(result => reply(result))
      .catch(error => reply(error));
  }
};
