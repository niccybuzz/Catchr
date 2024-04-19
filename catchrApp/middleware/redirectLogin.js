function redirectLogin(req, res, next){
    if (!req.session.authen){
        res.redirect("/login")
    }
    next();
}

module.exports = redirectLogin