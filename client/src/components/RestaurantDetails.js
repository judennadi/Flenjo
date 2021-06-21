import { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../context/RestaurantContextProvider";
import { Avatar, CircularProgress } from "@material-ui/core";
import { AddAPhotoOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import axios from "axios";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const RestaurantDetails = ({ match }) => {
  const id = match.params.id;
  const { restaurant } = useContext(RestaurantContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/restaurants/${id}`);
        console.log(data);
        setReviews(data.reviews);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`/restaurants/eg`);
  //       console.log(data);
  //       // dispatch({ type: "SET_RESTAURANTS", payload: data.data });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      <section className="restaurant-details">
        <div className="details-img-grid">
          <div>
            <img src={restaurant.image_url} alt="" />
          </div>
          <div>
            <img src={restaurant.image_url} alt="" />
          </div>
          <div>
            <AddAPhotoOutlined fontSize="large" style={{ color: "rgba(0,0,0,0.7)" }} />
          </div>
        </div>

        <div className="details-name">
          <div>
            <h4>{restaurant.name}</h4>
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
          <div>
            <div>
              <Rating value={restaurant.rating} readOnly named={restaurant.name} precision={0.5} />
              <p>{restaurant.rating}</p>
            </div>
            <p>{restaurant.review_count} Delivery Reviews</p>
          </div>
        </div>

        <div className="reviews">
          <h4>Reviews</h4>
          <hr className="hr-xl" />
          <div>
            <div>
              {isLoading ? (
                <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
                  <CircularProgress size="30px" thickness={4} />
                </div>
              ) : (
                <>
                  {reviews.map((review) => (
                    <div key={review.id} className="review">
                      <div className="review-dp">
                        <div>
                          <img src={review.user.image_url ? review.user.image_url : null} alt="" />
                        </div>
                        <div>
                          <p>{review.user.name}</p>
                          <p>{review.time_created}</p>
                        </div>
                      </div>
                      <div>
                        <Rating value={review.rating} readOnly named={review.id} precision={0.5} />
                        <p>{review.rating}</p>
                      </div>
                      <p>{review.text}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div>
              <div className="add-review">
                <h4>Rate your delivery experience</h4>
                <div>
                  <Rating
                    size="large"
                    name="hover-feedback"
                    value={value}
                    precision={1}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {value !== null && <p>{labels[hover !== -1 ? hover : value]}</p>}
                </div>
                <p onClick={() => {}}>Write a Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
