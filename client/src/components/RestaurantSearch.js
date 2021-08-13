import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { StarRating } from "./accessories/StarRating";
import { RestaurantContext } from "../context/RestaurantContextProvider";

const RestaurantSearch = () => {
  const { restaurants, term } = useContext(RestaurantContext);
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/restaurant/${id}`);
  };
  return (
    <div className="container">
      <section className="best-food-list container">
        <h4>{term ? `Best results for: ${term}` : "Best Food within your location"}</h4>

        <div className="best-food-con">
          {restaurants.map((restaurant) => (
            <div className="best-food" onClick={() => handleClick(restaurant.id)} key={restaurant.id}>
              <div>
                <img src={restaurant.image_url} alt="" />
              </div>
              <div>
                <p>{restaurant.name}</p>
                <div className="rating">
                  <StarRating value={restaurant.rating} />
                  <p>{restaurant.rating}</p>
                  <p>({restaurant.review_count} Delivery Reviews)</p>
                </div>
                <div className="categories">
                  {restaurant.categories.map((x, idx) =>
                    idx === restaurant.categories.length - 1 ? (
                      <p key={idx}>{x.title}</p>
                    ) : (
                      <p key={idx}>{x.title},</p>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantSearch;
