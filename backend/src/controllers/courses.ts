import express from "express";
import { getCourse } from "../uoft-api/getCourses";

const router = express.Router();

const getRouter = () => {
  router.get(`/courses/:session/:code`, async (req, res) => {
    const code = req.params.code.substring(0, 6);
    const session = req.params.session;
    if (code.length < 6) {
      res.status(400).json({
        message: "Code needs to be at least 6 length like CSC108 or CSC108H1",
      });
    } else {
      try {
        const courses = await getCourse(req.params.code, session);
        res.json(courses);
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return router;
};
export default getRouter;
