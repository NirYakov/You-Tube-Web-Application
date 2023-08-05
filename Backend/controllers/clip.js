
const Clip = require("../models/clip");



exports.createClip = (req, res, next) => {
    res.status(400).json({
        message: "Not Implemented!",
        error: "n/a"
    });
}


exports.getClip = (req, res, next) => {
    res.status(400).json({
        message: "Not Implemented!",
        error: "n/a"
    });
}


exports.getAllUserClips = (req, res, next) => {

    console.log(" Here in clip get all");

    res.status(200).json({
        message: "All clips",
        clips: myClips
    });


    // res.status(400).json({
    //     message: "Not Implemented!",
    //     error: "n/a"
    // });
}


exports.updatedClip = (req, res, next) => {
    res.status(400).json({
        message: "Not Implemented!",
        error: "n/a"
    });
}


exports.deleteClip = (req, res, next) => {
    res.status(400).json({
        message: "Not Implemented!",
        error: "n/a"
    });
}


myClips = [
    {
        shortUri: "T60uj6EfsU8",
        catagory: "Rock",
        name: "From heads Unworth",
    },
    // {
    //   shortUri: "T60uj6EfsU8",
    //   catagory: "Rock",
    //   name: "From heads Unworth From heads Unworth From heads Unworth From heads Unworth",
    // },
    {
        shortUri: "kXYiU_JCYtU",
        catagory: "Nu metal",
        name: "numb",
    },
    {
        shortUri: "RRKJiM9Njr8",
        catagory: "Rock",
        name: "my chemical romance",
    },
    {
        shortUri: "fibYknUCIU4",
        catagory: "Rap",
        name: "nate / clounds",
    },
    {
        shortUri: "r_0JjYUe5jo",
        catagory: "Rap",
        name: "god zilla",
    },
    {
        shortUri: "XGGWhOUYObc",
        catagory: "Rap",
        name: "nate / Leave me alone",
    },
    {
        shortUri: "SBjQ9tuuTJQ",
        catagory: "Rock",
        name: "the pritender",
    },
    {
        shortUri: "DWaB4PXCwFU",
        catagory: "Rock",
        name: "dairy of jane",
    },
    {
        shortUri: "70hIRnj9kf8",
        catagory: "Rock",
        name: "the good die young",
    },
    {
        shortUri: "3t2WkCudwfY",
        catagory: "Nu metal",
        name: "a place for my head",
    },
    {
        shortUri: "pXRviuL6vMY",
        catagory: "Nu metal",
        name: "stressed out",
    },
];
