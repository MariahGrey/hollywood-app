module.exports = {
  path: "/api/movies/{movieId}",
  method: "GET",
  handler: function(request, reply) {
    let movieId = request.params.movieId;

    this.models.Movie
      .get(movieId)
      .getJoin({ actors: true })
      .then(result => reply(result))
      .catch(error => reply(error));
  }
};
