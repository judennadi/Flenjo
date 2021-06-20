import bar1 from "../img/places/bar1.jpg";
import bar2 from "../img/places/bar2.jpg";
import liquor from "../img/drinks/liquor.jpg";
import beer from "../img/drinks/beer.jpg";

const Nightlife = ({ history }) => {
  const handleNavClick = (e, path) => {
    const li = e.currentTarget;
    document.querySelector(".dine-nightlife .active").classList.remove("active");
    li.classList.add("active");
    history.push(path);
  };

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
            <p>
              Explore curated lists of top restaurants, cafes, pubs, and bars in your location based on trends
            </p>
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

        <section className="restaurants container">
          <h4>Nightlife Restaurants Close to You</h4>
          <div>
            <div>
              <div>
                <img src={bar1} alt="" />
              </div>
              <div>
                <p>speed</p>
              </div>
            </div>
            <div>
              <div>
                <img src={bar1} alt="" />
              </div>
              <div>
                <p>speed</p>
              </div>
            </div>
            <div>
              <div>
                <img src={bar1} alt="" />
              </div>
              <div>
                <p>speed</p>
              </div>
            </div>
            <div>
              <div>
                <img src={bar1} alt="" />
              </div>
              <div>
                <p>speed</p>
              </div>
            </div>
            <div>
              <div>
                <img src={bar1} alt="" />
              </div>
              <div>
                <p>speed</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Nightlife;
