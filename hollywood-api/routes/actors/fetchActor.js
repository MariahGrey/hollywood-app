module.exports = {
  path: "/api/actors/{actorId}",
  method: "GET",
  handler: function(request, reply) {
    let actorId = request.params.actorId;

    this.models.Actor
      .get(actorId)
      .getJoin({ movies: true })
      .then(result => reply(result))
      .catch(error => reply(result));
  }
};
