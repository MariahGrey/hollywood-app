module.exports = {
  path: "/api/movies",
  method: "POST",
  handler: function(request, reply) {
    let movie = new this.models.Movie(request.payload);

    movie
      .save()
      .then(result => reply(result))
      .catch(error => reply(error));
  }
};
