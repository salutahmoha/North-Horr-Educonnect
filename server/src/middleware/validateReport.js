function validateReport(req, res, next) {
    const { schoolname,  body } = req.body;
    if (!schoolname) return res.status(400).json({ message: "schoolname is required" });
    if (!body) return res.status(400).json({ message: "Body is required" });
    next();
}

export default validateReport;