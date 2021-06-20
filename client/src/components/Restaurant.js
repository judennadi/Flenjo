import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { RestaurantContext } from "../context/RestaurantContextProvider";

const Restaurant = ({ restaurant, meals }) => {
  const history = useHistory();
  const { dispatch } = useContext(RestaurantContext);

  const handleClick = () => {
    dispatch({ type: "SET_RESTAURANT", payload: restaurant.id });
    history.push(`/api/restaurant/${restaurant.id}`);
  };
  return (
    <>
      <div className="best-food" onClick={handleClick}>
        <div>
          <img src={restaurant.image_url ? restaurant.image_url : meals[2].img} alt="" />
        </div>
        <div>
          <p>{restaurant.name}</p>
          <div className="rating">
            <Rating value={restaurant.rating} readOnly named={restaurant.name} precision={0.5} />
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
    </>
  );
};

export default Restaurant;
