const request = require('request');

async function proxyHandler(req, res) {
    const decodedUrl = decodeURIComponent(req.query.url);
    request(decodedUrl, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
        }
        res.send(body);
    })
}

module.exports = proxyHandler;