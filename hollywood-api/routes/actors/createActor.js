module.exports = {
  path: "/api/actors",
  method: "POST",
  handler: function(request, reply) {
    let actor = new this.models.Actor(request.payload);

    actor
      .save()
      .then(result => reply(result))
      .catch(error => reply(error));
  }
};
