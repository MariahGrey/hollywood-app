module.exports = {
  path: "/api/movies/{movieId}/actor",
  method: "DELETE",
  handler: function(request, reply) {
    let movieId = request.params.movieId;
    let actor = request.payload;

    this.models.Movie
      .get(movieId)
      .then(movie => movie.removeRelation("actors", actor))
      .then(result => reply(result))
      .catch(error => reply(error));
  }
};
