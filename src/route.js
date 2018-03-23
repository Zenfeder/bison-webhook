const { exec, execSync } = require('child_process')

module.exports = function(app) {
    app.all('*', (req, res, next) => {
        next()
    })

    app.route('/bison-api')
        .post((req, res, next) => {
            let targetDir = '../bison-api'

            execSync('git pull', { cwd: targetDir })

            res.json({
                message: `${req.body}`
            })

            execSync('docker image build -t bison-api .', { cwd: targetDir })            
            execSync('docker container kill bison-api', { cwd: targetDir })
            execSync('docker container run --name bison-api --rm -p 8081:8081 bison-api', { cwd: targetDir })
            execSync('docker image prune')
        })

    app.route('/bison-h5')
        .post((req, res, next) => {
            let targetDir = '../bison-h5'
            
            execSync('git pull', { cwd: targetDir })

            res.json({
                message: `${req.body}`
            })

            execSync('docker image build -t bison-h5 .', { cwd: targetDir })
            execSync('docker container kill bison-h5', { cwd: targetDir })
            execSync('docker container run --name bison-h5 --rm -p 8080:8080 bison-h5', { cwd: targetDir })
            execSync('docker image prune')
        })
}