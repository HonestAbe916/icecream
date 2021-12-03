const express = require('express');
const axios = require('axios');

const app = express();

const apiKey = process.env.YELP_API_KEY;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:location/:term', async (req, res) => {
	const { location, term } = req.params;

	try {
		const results = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      params: {
        location: location,
        term: term,
        limit: 5,
      },
    });

    const reviewsInjected = await getReviews(results.data);
    //console.log(test);

    return res.status(200).json({ status: true, data: reviewsInjected });
	} catch(e) {
		return res.status(400).json({ status: false, data: e.message });
	}
});

async function getReviews(data) {
	for (let i = 0; i < data.businesses.length; i ++) {
		data.businesses[i].reviews = await getReview(data.businesses[i].id);
	}

	return data;
}

async function getReview(id) {
	try {
		const result = await axios.get(`https://api.yelp.com/v3/businesses/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      params: {
        limit: 1,
      },
    });

    return result.data;
	} catch(e) {
		console.log(e);
		return false;
	}
}

// Start the Express server
app.listen(4000, () => console.log('Server running on port 4000!'));