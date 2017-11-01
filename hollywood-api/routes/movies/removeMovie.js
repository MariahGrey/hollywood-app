module.exports = {
  path: "/api/movies/{movieId}",
  method: "DELETE",
  handler: function(request, reply) {
    let movieId = request.params.movieId;

    this.models.Movie
      .get(movieId)
      .then(doc => doc.delete())
      .then(result => reply(true))
      .catch(error => reply(error));
  }
};
