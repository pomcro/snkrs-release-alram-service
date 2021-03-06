module.exports = {
	apps: [
		{
			name: 'SNKRS98_WEB',
			// package.json에 정의된 npm run start를 실행하게 해서 PM2로 관리하게 한다.
			script: 'sudo npm run start',
			args: '',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			// 개발 환경에서 적용될 설정
			// pm2 start ecosystem.config.js
			env: {
				HOST: '0.0.0.0',
				PORT: 8080,
				NODE_ENV: 'development',
			},
			// 배포 환경에서 적용될 설정
			// pm2 start ecosystem.config.js --env production
			env_production: {
				HOST: '0.0.0.0',
				PORT: 8080,
				NODE_ENV: 'production',
			},
			output: './logs/console.log',
			error: './logs/consoleError.log',
		},
	],
	//  deplay시, 아래 소스 추가
	deploy: {
		production: {
			// sample
			user: 'node',
			host: '123.12.123.1',
			ref: 'origin/master',
			repo: 'git@github.com:repo.git',
			path: '/var/www/production',
			'post-deploy':
				'sudo npm install && pm2 reload ecosystem.config.js --env production',
		},
	},
};
