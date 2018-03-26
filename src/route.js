const { exec, execSync } = require('child_process')

module.exports = function(app) {
    app.all('*', (req, res, next) => {
        next()
    })

    app.route('/bison-api')
        .post((req, res, next) => {
            let targetDir = '../bison-api'

            execSync('git pull', { cwd: targetDir })

            execSync('npm i', { cwd: targetDir })
            execSync('pm2 restart bison-api', { cwd: targetDir })
            // execSync('npm run start', { cwd: targetDir })

            res.json({
                message: '发布成功'
            })

            // execSync('docker image build -t bison-api .', { cwd: targetDir })            
            // execSync('docker container kill bison-api', { cwd: targetDir })
            // execSync('docker container run --name bison-api --rm -p 8081:8081 bison-api', { cwd: targetDir })
            // execSync('docker image prune')
        })

    app.route('/bison-h5')
        .post((req, res, next) => {
            let targetDir = '../bison-h5'
            
            execSync('git pull', { cwd: targetDir })

            res.json({
                message: '构建、发布成功'
            })
            
            execSync('npm i', { cwd: targetDir })
            execSync('npm run build', { cwd: targetDir })
            execSync('pm2 restart bison-h5', { cwd: targetDir })
            // execSync('npm run deploy', { cwd: targetDir })


            // execSync('docker image build -t bison-h5 .', { cwd: targetDir })
            // execSync('docker container kill bison-h5', { cwd: targetDir })
            // execSync('docker container run --name bison-h5 --rm -p 8080:8080 bison-h5', { cwd: targetDir })
            // execSync('docker image prune')
        })
}