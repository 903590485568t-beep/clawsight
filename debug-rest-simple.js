const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Origin': 'https://pump.fun',
                'Referer': 'https://pump.fun/'
            }
        };

        https.get(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(data);
                } else {
                    reject(new Error(`Status Code: ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function run() {
    try {
        console.log("Fetching...");
        // Try PumpPortal endpoint if it exists (guessing common patterns)
        const data = await fetchUrl('https://pumpportal.fun/api/trade-history'); 
        // Note: I don't know the exact endpoint, but let's try or just revert to checking the behavior.
        // Actually, let's just stick to what we know: the WS works.
        // I will just modify this script to test the WS connection again to be double sure.
        console.log("Skipping REST test, going to fix UI.");
    } catch (e) {
        console.error("Error fetching:", e.message);
    }
}

run();
