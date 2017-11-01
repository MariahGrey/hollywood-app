module.exports = {
  path: "/api/actors/{actorId}",
  method: ["PUT", "PATCH"],
  handler: function(request, reply) {
    let actorId = request.params.actorId;
    let actor = request.payload;

    this.models.Actor
      .get(actorId)
      .then(doc => doc.merge(actor).save())
      .then(result => reply(result))
      .catch(error => reply(error));
  }
};
