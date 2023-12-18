import express from "express";
const router = express.Router();

router.get("/auth", (req, res) => {
  res.json({
    message: "API Auth is Live",
  });
});

export default router;
