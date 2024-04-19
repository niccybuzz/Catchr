function redirectHome(req, res, next){
    if (req.session.authen){
        res.redirect("/cards")
    }
    next();
}

module.exports = redirectHome