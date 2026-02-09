async function testFetch() {
    try {
        const response = await fetch('https://frontend-api.pump.fun/coins/latest', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Origin': 'https://pump.fun',
                'Referer': 'https://pump.fun/'
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Successfully fetched', data.length, 'coins via REST');
            console.log('First coin:', JSON.stringify(data[0], null, 2));
        } else {
            console.error('Failed to fetch:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testFetch();
