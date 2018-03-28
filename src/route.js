const { exec, execSync } = require('child_process')

module.exports = function(app) {
    app.all('*', (req, res, next) => {
        next()
    })

    app.route('/ha-kafer-api')
        .post((req, res, next) => {
            let targetDir = '../ha-kafer-api'

            execSync('git pull', { cwd: targetDir })

            execSync('npm i', { cwd: targetDir })
            execSync('pm2 restart ha-kafer-api', { cwd: targetDir })
            // execSync('npm run start', { cwd: targetDir })

            res.json({
                message: '发布成功'
            })

            // execSync('docker image build -t ha-kafer-api .', { cwd: targetDir })            
            // execSync('docker container kill ha-kafer-api', { cwd: targetDir })
            // execSync('docker container run --name ha-kafer-api --rm -p 8081:8081 ha-kafer-api', { cwd: targetDir })
            // execSync('docker image prune')
        })

    app.route('/ha-kafer-h5')
        .post((req, res, next) => {
            let targetDir = '../ha-kafer-h5'
            
            execSync('git pull', { cwd: targetDir })

            res.json({
                message: '构建、发布成功'
            })
            
            execSync('npm i', { cwd: targetDir })
            execSync('npm run build', { cwd: targetDir })
            execSync('pm2 restart ha-kafer-h5', { cwd: targetDir })
            // execSync('npm run deploy', { cwd: targetDir })


            // execSync('docker image build -t ha-kafer-h5 .', { cwd: targetDir })
            // execSync('docker container kill ha-kafer-h5', { cwd: targetDir })
            // execSync('docker container run --name ha-kafer-h5 --rm -p 8080:8080 ha-kafer-h5', { cwd: targetDir })
            // execSync('docker image prune')
        })
}