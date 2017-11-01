module.exports = {
  path: "/api/actors/{actorId}",
  method: "DELETE",
  handler: function(request, reply) {
    let actorId = request.params.actorId;

    this.models.Actor
      .get(actorId)
      .then(doc => doc.delete())
      .then(result => reply(true))
      .catch(error => reply(error));
  }
};
