const shell = require('shelljs')

module.exports = function(app) {
    app.all('*', (req, res, next) => {
        next()
    })

    app.route('/bison-api')
        .post((req, res, next) => {
            shell.cd('../bison-api')
            shell.exec('git pull')
            shell.exec('docker image build -t bison-api .')
            shell.exec('docker container run --rm -p 8081:8081 -it bison-api')
            res.json({
                message: `${req.body}`
            })
        })

    app.route('/bison-h5')
        .post((req, res, next) => {
            shell.cd('../bison-h5')
            shell.exec('git pull')
            shell.exec('docker image build -t bison-h5 .')
            shell.exec('docker container run --rm -p 8080:8080 -it bison-h5')
            res.json({
                message: `${req.body}`
            })
        })
}