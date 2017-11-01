module.exports = {
  path: "/api/movies",
  method: "GET",
  handler: function(request, reply) {
    this.models.Movie
      .filter({})
      .getJoin({ actors: true })
      .then(results => reply(results))
      .catch(error => reply(error));
  }
};
