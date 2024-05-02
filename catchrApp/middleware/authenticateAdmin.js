function authenticateAdmin(req, res, next){
    if (!req.session.admin){
        res.redirect("/adminpanel")
    }
    next();
}

module.exports = authenticateAdmin