const { execSync } = require('child_process')

module.exports = function(app) {
    app.all('*', (req, res, next) => {
        next()
    })

    app.route('/bison-api')
        .post((req, res, next) => {
            let targetDir = '../bison-api'

            execSync('git pull', { cwd: targetDir })
            execSync('docker image build -t bison-api .', { cwd: targetDir })
            execSync('docker container run --rm -p 8081:8081 bison-api', { cwd: targetDir })
            res.json({
                message: `${req.body}`
            })
        })

    app.route('/bison-h5')
        .post((req, res, next) => {
            let targetDir = '../bison-h5'
            
            execSync('git pull', { cwd: targetDir })
            execSync('docker image build -t bison-h5 .', { cwd: targetDir })
            execSync('docker container run --rm -p 8080:8080 bison-h5', { cwd: targetDir })
            res.json({
                message: `${req.body}`
            })
        })
}