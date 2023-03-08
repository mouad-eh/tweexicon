const request = require('request');

async function proxyHandler(req, res) {
    const { url } = req.query;
    request(url, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error.message });
        }
        res.send(body);
    })
}

module.exports = proxyHandler;