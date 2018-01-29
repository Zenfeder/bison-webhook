const shell = require('shelljs')

module.exports = function(app) {
    app.all('*', (req, res, next) => {
        next()
    })

    app.route('/bison-api')
        .post((req, res, next) => {
            shell.cd('../bison-api')
            shell.exec('git pull')
            shell.exec('npm install')
            shell.exec('pm2 restart bison-api')
            res.json({
                message: `${req.body}`
            })
        })

    app.route('/bison-spa')
        .post((req, res, next) => {
            shell.cd('../bison-spa')
            shell.exec('git pull')
            shell.exec('npm install')
            shell.exec('pm2 restart bison-spa')
            res.json({
                message: `${req.body}`
            })
        })
}