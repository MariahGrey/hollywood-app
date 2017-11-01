module.exports = {
  path: "/api/movies/{movieId}/actor",
  method: "POST",
  handler: function(request, reply) {
    let movieId = request.params.movieId;
    let actor = request.payload;

    this.models.Movie
      .get(movieId)
      .then(movie => movie.addRelation("actors", actor))
      .then(result => reply(result))
      .catch(error => reply(error));
  }
};
