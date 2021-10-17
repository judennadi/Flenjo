const router = require("express").Router();

const {
  getAllRestaurants,
  getBars,
  getHotels,
  searchAutocomplete,
  getRestaurant,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getEg,
} = require("../controllers/restaurants");

router.get("/", getAllRestaurants);
router.get("/bars", getBars);
router.get("/hotels", getHotels);
router.get("/search/autocomplete", searchAutocomplete);
router.get("/eg", getEg);
router.get("/:id", getRestaurant);
router.post("/", addRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;
