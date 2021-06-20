import { ArrowRight } from "@material-ui/icons";
import trending from "../img/foods/trending.jpg";
import workPlace from "../img/places/work place.jpg";
import bestOfLocation from "../img/places/best of.jpg";
import outdoor from "../img/places/outdoor.jpg";

const DiningOut = ({ history }) => {
  const handleNavClick = (e, path) => {
    const li = e.currentTarget;
    document.querySelector(".dine-nightlife .active").classList.remove("active");
    li.classList.add("active");
    history.push(path);
  };
  return (
    <div className="container">
      <section className="dine-nightlife">
        <h5 className="active" onClick={(e) => handleNavClick(e, "/dine-out")}>
          Dining
        </h5>
        <h5 onClick={(e) => handleNavClick(e, "/nightlife")}>Nightlife</h5>
      </section>
      <section className="dine-out container">
        <div className="dine-out-con">
          <div>
            <h4>Collections</h4>
            <p>
              Explore curated lists of top restaurants, cafes, pubs, and bars in your location based on trends
            </p>
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

        <section className="restaurants container">
          <h4>Dine-Out Restaurants Close To You</h4>
          <div>
            <div>
              <div>
                <img src={trending} alt="" />
              </div>
              <div>
                <p>life</p>
              </div>
            </div>
            <div>
              <div>
                <img src={trending} alt="" />
              </div>
              <div>
                <p>life</p>
              </div>
            </div>
            <div>
              <div>
                <img src={trending} alt="" />
              </div>
              <div>
                <p>life</p>
              </div>
            </div>
            <div>
              <div>
                <img src={trending} alt="" />
              </div>
              <div>
                <p>life</p>
              </div>
            </div>
            <div>
              <div>
                <img src={trending} alt="" />
              </div>
              <div>
                <p>life</p>
              </div>
            </div>
            <div>
              <div>
                <img src={trending} alt="" />
              </div>
              <div>
                <p>life</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default DiningOut;
