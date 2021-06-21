import { useHistory } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const RestaurantCard = ({ restaurant, meals }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/restaurant/${restaurant.id}`);
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

export default RestaurantCard;