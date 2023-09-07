
const Clip = require("../models/clip");
const User = require("../models/user");
const Validators = require("../validators");


exports.createClip = async (req, res, next) => {

  console.log("Wyyyy ");

  console.log(" req.body", req.body);

  const link = req.body.shortUri;
  const category = req.body.category;
  const review = req.body.review;
  const name = req.body.name;

  const userId = req.userData.userId;

  const clipInDb = await Clip.findOne({ creator: userId, link });

  if (!Validators.checkYoutubeShortLink(link)) {
    console.log("Not a short link format");
  }

  console.log(" clipInDb ", clipInDb);

  if (clipInDb) {
    res.status(401).json(
      {
        message: "Clip already the cliplist.",
        error: "Clip already the cliplist."
      });
    return;
  }

  const newClip = new Clip({
    creator: userId,
    link,
    category,
    review,
    name,
  });

  newClip.save()
    .then(response => {

      console.log(" Pow here and well ? ");

      res.status(201).json(
        {
          message: "Clip created!",
          response
        });

    }).catch(error => {
      console.log(error);

      res.status(401).json(
        {
          message: "error !!",
          error
        });
    });
}


exports.getClip = (req, res, next) => {

  const link = req.params.link;
  const creator = req.userData.userId;

  const clip = Clip.findOne({ creator, link });

  console.log({ creator });

  console.log("ping back clip get");

  clip.then(response => {

    res.status(200).json({
      message: "show :)",
      clip: response
    });

  }).catch(error => {
    res.status(500).json({
      message: "error !!",
    });

  });
}


exports.getAllUserClips = (req, res, next) => {

  console.log(" Here in clip get all");

  const clipsDb = Clip.find({ creator: req.userData.userId });

  console.log("ping back clips get");

  clipsDb.then(response => {

    console.log("response", response);

    res.status(200).json({
      message: "All clips",
      clips: response || []
    });


  }).catch(error => {
    res.status(500).json({
      message: "error !!",
    });

  });
}


exports.updatedClip = async (req, res, next) => {

  try {

    const link = req.params.link;
    const userId = req.userData.userId;
    const name = req.body.name;
    const category = req.body.category;
    const review = req.body.review;

    if (!name || !category || !review || !link || !userId) {
      res.status(500).json({ message: "Error in parameters!" });
      return;
    }

    console.log(userId, link);

    if (!Validators.checkYoutubeShortLink(link)) {
      console.log("Not a short link format");
    }

    const filter = { creator: userId, link };
    const update = { name, category, review };

    const clip = await Clip.findOneAndUpdate(filter, update, {
      returnOriginal: false
    });


    res.status(200).json({
      health: "Online ! :)",
      clip
    });

  } catch (error) {

    console.log("error clip show ", error);
    res.status(500).json({ message: "Fetcing clip failed!" });
  }
}


exports.deleteClip = (req, res, next) => {
  const link = req.params.link;
  const userId = req.userData.userId;

  console.log("link : ", link);
  console.log("userId : ", userId);

  Clip.deleteOne({ link, creator: req.userData.userId }).then(result => {
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    }
    else {
      res.status(401).json({ message: "Not Authorized!" });
    }
  }).catch(error => {
    res.status(500).json({ message: "Fetcing post failed!" });
  });
}