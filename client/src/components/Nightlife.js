import { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import { meals } from "./Home";
import bar1 from "../img/places/bar1.jpg";
import bar2 from "../img/places/bar2.jpg";
import liquor from "../img/drinks/liquor.jpg";
import beer from "../img/drinks/beer.jpg";

const Nightlife = ({ history }) => {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavClick = (e, path) => {
    const li = e.currentTarget;
    document.querySelector(".dine-nightlife .active").classList.remove("active");
    li.classList.add("active");
    history.push(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      const source = axios.CancelToken.source();
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/restaurants/nightlife`, {
          cancelToken: source.token,
        });
        console.log(data);
        setClubs(data.data);
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
      <section className="dine-nightlife">
        <h5 onClick={(e) => handleNavClick(e, "/dine-out")}>Dining</h5>
        <h5 className="active" onClick={(e) => handleNavClick(e, "/nightlife")}>
          Nightlife
        </h5>
      </section>
      <section className="nightlife container">
        <div className="nightlife-con">
          <div>
            <h4>Collections</h4>
            <p>Explore curated lists of top clubs in your location based on trends</p>
          </div>

          <div className="trending-con">
            <div>
              <img src={bar1} alt="" />
              <div>
                <p>Best Bars & Pubs</p>
                <div>
                  <p>30 Places</p>
                </div>
              </div>
            </div>
            <div>
              <img src={bar2} alt="" />
              <div>
                <p>Where's The Party?</p>
                <div>
                  <p>50 Places</p>
                </div>
              </div>
            </div>
            <div>
              <img src={liquor} alt="" />
              <div>
                <p>Just Drinks</p>
                <div>
                  <p>16 Places</p>
                </div>
              </div>
            </div>
            <div>
              <img src={beer} alt="" />
              <div>
                <p>Game Night</p>
                <div>
                  <p>22 Places</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="best-food-list container">
          <h4>Dine-Out Restaurants Close To You</h4>
          <div className="best-food-con">
            {clubs.map((club) => (
              <RestaurantCard key={club.id} restaurant={club} meals={meals} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Nightlife;
