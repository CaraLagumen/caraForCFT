const express = require(`express`);

const eventController = require(`../controllers/eventController`);

const router = express.Router();

router.get(`/`, eventController.getEvents);
router.post(`/import`, eventController.createEvents);

router.get(`/failed`, eventController.getFailedEvents);
router.get(`/day-before`, eventController.getDayBeforeLastEvents);
router.get(`/week-before`, eventController.getWeekBeforeEvents);
router.get(`/:userId`, eventController.getSingleUserEvents);

module.exports = router;
