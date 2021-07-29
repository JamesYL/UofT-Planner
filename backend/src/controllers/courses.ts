import express from "express";
import { getCourse } from "../services/getCourses";
import logger from "../helper/logger";

const router = express.Router();

const getRouter = () => {
  router.get(`/courses/:session/:code`, async (req, res) => {
    const code = req.params.code.trim();
    const session = req.params.session;
    logger.info("Course info requested");
    if (code.length < 6) {
      res.status(400).json({
        message: "Code needs to be at least 6 length like CSC108 or CSC108H1",
      });
      logger.info(`Course info request failed: Bad code ${req.params.code}`);
    } else {
      try {
        const courses = await getCourse(req.params.code, session);
        res.json(courses);
        logger.info(`Course info request success`);
      } catch (err) {
        logger.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return router;
};
export default getRouter;
