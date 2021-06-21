const db = require("../db");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const getAllRestaurants = async (req, res) => {
  const token =
    "rPF8LXa4WNvtdNO7k2jtwKY17VsyIsEQQUWHZiN-R93JR2bQ8LMdzAR_cLMijcUE91WEuq17OciXUWSodtHTdqJ_7f6PuDEbEEdgXV_B6KZb65vYBZD56VWTZBPLYHYx";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const { data } = await axios.get(
      `https://api.yelp.com/v3/businesses/search?term=coffee&location=CA&limit=21`,
      config
    );

    // const { rows } = await db.query("SELECT * FROM restaurants");
    res.status(200).json({ data: data.businesses });
  } catch (error) {
    console.log(error);
  }
};

const getEg = async (req, res) => {
  const token =
    "rPF8LXa4WNvtdNO7k2jtwKY17VsyIsEQQUWHZiN-R93JR2bQ8LMdzAR_cLMijcUE91WEuq17OciXUWSodtHTdqJ_7f6PuDEbEEdgXV_B6KZb65vYBZD56VWTZBPLYHYx";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const { data } = await axios.get(
      `http://api.reviewsmaker.com/yelp/?https://www.yelp.com/biz/the-cool-bean-cafe-oakhurst?adjust_creative=hBZ__DNAoybHsv_MojmzmA&hrid=arSsZvDjZQ0_3JSUH5wsHA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&api_key=4b3d3d92-27f4-4eaa-bb8b-281cb8aa3860`,
      config
    );

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurant = async (req, res) => {
  const token =
    "rPF8LXa4WNvtdNO7k2jtwKY17VsyIsEQQUWHZiN-R93JR2bQ8LMdzAR_cLMijcUE91WEuq17OciXUWSodtHTdqJ_7f6PuDEbEEdgXV_B6KZb65vYBZD56VWTZBPLYHYx";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await Promise.all([
      axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, config),
      axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}/reviews`, config),
    ]);
    // const { rows } = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
    res.status(200).json({ restaurant: response[0].data, reviews: response[1].data.reviews });
  } catch (error) {
    console.log(error);
  }
};

const addRestaurant = async (req, res) => {
  const { name, location, price_range } = req.body;
  text = "INSERT INTO restaurants(id, name, location, price_range) VALUES($1, $2, $3, $4) RETURNING *";
  try {
    const { rows } = await db.query(text, [uuidv4(), name, location, price_range]);
    res.status(200).json({ result: rows.length, data: rows });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (req, res) => {
  // const { name, location, price_range } = req.body;
  const reqBody = Object.values(req.body);
  const text = (body) => {
    if (body.name && body.location && body.price_range) {
      return "UPDATE restaurants SET name = $2, location = $3, price_range = $4 WHERE id = $1  RETURNING *";
    } else if (body.name && body.location && !body.price_range) {
      return "UPDATE restaurants SET name = $2, location = $3 WHERE id = $1  RETURNING *";
    } else if (body.location && body.price_range && !body.name) {
      return "UPDATE restaurants SET location = $2, price_range = $3 WHERE id = $1  RETURNING *";
    } else if (body.name && body.price_range && !body.location) {
      return "UPDATE restaurants SET name = $2, price_range = $3 WHERE id = $1  RETURNING *";
    } else if (body.name && !body.price_range && !body.location) {
      return "UPDATE restaurants SET name = $2 WHERE id = $1  RETURNING *";
    } else if (body.location && !body.price_range && !body.name) {
      return "UPDATE restaurants SET location = $2 WHERE id = $1  RETURNING *";
    } else if (body.price_range && !body.name && !body.location) {
      return "UPDATE restaurants SET price_range = $2 WHERE id = $1  RETURNING *";
    }
  };

  try {
    const { rows } = await db.query(text(req.body), [req.params.id, ...reqBody]);
    res.status(200).json({ result: rows.length, data: rows });
  } catch (error) {
    console.log(error);
  }
};
const deleteRestaurant = async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
    res.status(200).json({ message: "Restaurant Deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getEg,
};
