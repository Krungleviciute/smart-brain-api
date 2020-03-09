const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "f3423383fe9f490fb23a93fb6a9aac31"
});

const handleApiCall = (req, res) => {
  const { input } = req.body;
  if (input.length) {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => res.json(data))
      .catch(err => res.status(400).json("unable to work with API"));
  } else {
    return;
  }
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};
