import React, { Suspense, useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { AddAPhotoOutlined, Person } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import axios from "axios";
import { StarRating, AddStarRating } from "./accessories/StarRating";
const Map = React.lazy(() => import("./accessories/Map"));

const RestaurantDetails = ({ match, history }) => {
  const [restaurant, setRestaurant] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(restaurant);

  // useEffect(() => {
  // });
  useEffect(() => {
    const fetchData = async () => {
      const source = axios.CancelToken.source();
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/restaurants/${match.params.id}`, {
          cancelToken: source.token,
        });
        console.log(data);
        setRestaurant(data.restaurant);
        setReviews(data.reviews);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.error(error);
      }
    };
    fetchData();
  }, [match.params.id]);

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <section className="restaurant-details">
        {isLoading ? (
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <CircularProgress size="30px" thickness={4} />
          </div>
        ) : (
          <>
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
                <p>{restaurant.location.address1 + ", " + restaurant.location.city}</p>
                <div className="map-con">
                  <Suspense
                    fallback={
                      <div className="cen-grid">
                        <CircularProgress size="30px" thickness={4} />
                      </div>
                    }
                  >
                    <Map
                      id={"map"}
                      latLng={{ lat: restaurant.coordinates.latitude, lng: restaurant.coordinates.longitude }}
                    />
                  </Suspense>
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
                  {reviews.map((review) => (
                    <div key={review.id} className="review">
                      <div className="review-dp">
                        <div>
                          {review.user.image_url ? (
                            <img src={review.user.image_url} alt="" />
                          ) : (
                            <Person style={{ color: "#cfcfcf", fontSize: "30px" }} />
                          )}
                        </div>
                        <div>
                          <p>{review.user.name}</p>
                          <p>{review.time_created}</p>
                        </div>
                      </div>
                      <div>
                        <StarRating value={review.rating} />
                        <p>{review.rating}</p>
                      </div>
                      <p>{review.text}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="add-review">
                    <h4>Rate your delivery experience</h4>
                    <div>
                      <AddStarRating size="large" />
                    </div>
                    <p onClick={() => {}}>Write a Review</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default RestaurantDetails;
