import bcrypt from "bcrypt";
import UserModel from "../models/model.js";
import apiAdapter from "../helper/apiAdapter.js";
import { serviceUrl } from "../config/urlApi.js";
import CircularJSON from "circular-json";

export const addUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      res.status(401).json({
        status: 401,
        errorMessage: `Validation Error : name: ${name}, username: ${username}, password: ${password},`,
      });
      return;
    }
    const newUserModel = new UserModel({
      name: name,
      username: username,
      password: bcrypt.hashSync(password, 10),
    });
    const newUser = await newUserModel.save();
    const updatedUserAfterSave = await UserModel.find();

    res.status(201).json({
      status: 201,
      message: "User succesfully added!",
      addedTodo: newUser,
      updatedUserAfterSave: updatedUserAfterSave,
    });
  } catch (error) {
    res.status(400).json({
      error,
      status: 400,
    });
  }
};

let checkUrl = async (description, location, full_time, page) => {
  let endpoint = `/api/recruitment/positions.json?page=${page}&description=${description}&location=${location}`;
  if (full_time === "true" || full_time === "false") {
    endpoint = `/api/recruitment/positions.json?page=${page}&description=${description}&location=${location}&full_time=${full_time}`;
  }
  return endpoint;
}

export const getJobs = async (req, res) => {
  try {
    const { description, location, full_time, page } = req.query;
    let endpoint = await checkUrl(description, location, full_time, page);
    const apiJob = apiAdapter(serviceUrl);
    await apiJob
      .get(endpoint)
      .then((success) => {
        const circularObject = success;
        circularObject.circularRef = circularObject;
        const jsonString = CircularJSON.stringify(circularObject);
        const jobs = JSON.parse(jsonString);
        return res.status(200).json({
          jobs: jobs.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const getJobDetail = async (req, res) => {
  const { id } = req.params;
  const apiJob = apiAdapter(serviceUrl);
  await apiJob
    .get(`/api/recruitment/positions/${id}`)
    .then((success) => {
      const circularObject = success;
      circularObject.circularRef = circularObject;
      const jsonString = CircularJSON.stringify(circularObject);
      const jobs = JSON.parse(jsonString);
      return res.status(200).json({
        jobDetail: jobs.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
