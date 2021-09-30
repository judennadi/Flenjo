import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight } from "@material-ui/icons";
import trending from "../img/foods/trending.jpg";
import workPlace from "../img/places/work place.jpg";
import bestOfLocation from "../img/places/best of.jpg";
import outdoor from "../img/places/outdoor.jpg";
import RestaurantCard from "./RestaurantCard";
import { meals } from "./Home";

const Bars = ({ history }) => {
  const [bars, setBars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const source = axios.CancelToken.source();
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/restaurants/bars`, {
          cancelToken: source.token,
        });
        console.log(data);
        setBars(data.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <section className="dine-out container">
        <div className="dine-out-con">
          <div>
            <h4>Collections</h4>
            <p>Explore curated lists of top bars in your location based on trends</p>
          </div>

          <div className="trending-con">
            <div>
              <img src={trending} alt="" />
              <div>
                <p>Trending This Week</p>
                <div>
                  <p>30 Places</p>
                  <div className="input-icon">
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src={bestOfLocation} alt="" />
              <div>
                <p>Best of your Location</p>
                <div>
                  <p>50 Places</p>
                  <div className="input-icon">
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src={workPlace} alt="" />
              <div>
                <p>Work Friendly Places</p>
                <div>
                  <p>16 Places</p>
                  <div className="input-icon">
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src={outdoor} alt="" />
              <div>
                <p>Outdoor Seating</p>
                <div>
                  <p>28 Places</p>
                  <div className="input-icon">
                    <ArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="best-food-list container">
          <h4>Bars Close To You</h4>
          <div className="best-food-con">
            {bars.map((bar) => (
              <RestaurantCard key={bar.id} restaurant={bar} meals={meals} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Bars;
