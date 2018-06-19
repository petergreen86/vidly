function log (req, res, next) {
    console.log('logging...');
    //if no next, it will hang!
    next();
}
module.exports = log;