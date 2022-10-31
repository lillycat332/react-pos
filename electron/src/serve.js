onmessage = (serverInfo) => {
	const { exec } = require('child_process');
	const { port, dbPath, quiet, binary } = JSON.parse(serverInfo.data);
	exec(`binary -p ${port} -d ${dbPath} ${quiet ? '-q' : ''}`,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				throw error;
				return;
			}
		})
}