module.exports = {
  path: "/api/actors",
  method: "GET",
  handler: function(request, reply) {
    this.models.Actor
      .filter({})
      .getJoin({ movies: true })
      .then(results => reply(results))
      .catch(error => reply(error));
  }
};
