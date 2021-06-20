import { useRef, useContext } from "react";
import { ArrowBackIos, ArrowForwardIos, ExpandMore } from "@material-ui/icons";
import beef from "../img/foods/beef.jpg";
import fish from "../img/foods/fish.jpg";
import chicken from "../img/foods/chicken.jpg";
import rice from "../img/foods/rice.jpg";
import seafood from "../img/foods/seafood.jpg";
import veggie from "../img/foods/veggies.jpg";
import burger from "../img/foods/burger.webp";
import cake from "../img/foods/cake.jpg";
import pizza from "../img/foods/pizza.webp";
import fries from "../img/foods/fries.webp";
import rolls from "../img/foods/rolls.webp";
import noodles from "../img/foods/noodles.png";
import deliverySec from "../img/nav/delivery-man (1).png";
import burgerking from "../img/brands/burgerking.webp";
import dominos from "../img/brands/dominos.webp";
import kfc from "../img/brands/kfc.webp";
import mcdelivery from "../img/brands/mcdelivery.webp";
import Restaurant from "./Restaurant";
import { RestaurantContext } from "../context/RestaurantContextProvider";
import { CircularProgress } from "@material-ui/core";

const meals = [
  { name: "Chicken", img: chicken },
  { name: "Pizza", img: pizza },
  { name: "Rice", img: rice },
  { name: "Cake", img: cake },
  { name: "Fries", img: fries },
  { name: "Rolls", img: rolls },
  { name: "Burger", img: burger },
  { name: "Beef", img: beef },
  { name: "Seafood", img: seafood },
  { name: "Fish", img: fish },
  { name: "Veggie", img: veggie },
  { name: "Noodles", img: noodles },
];

const brands = [{ img: burgerking }, { img: dominos }, { img: kfc }, { img: mcdelivery }];

const Home = () => {
  const { isLoading, restaurants } = useContext(RestaurantContext);
  // const [userGeoPos, setUserGeoPos] = useState({});
  const mealRef = useRef([]);
  const promoRef = useRef([]);

  console.log(restaurants);

  // useEffect(() => {
  //   setRestaurants(restaurants);
  // }, [state]);

  const isInViewport = (el) => {
    let bounding = el.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const handleClick = (e) => {
    const btnIcon = e.currentTarget.childNodes[1];
    btnIcon.classList.toggle("rot");
    mealRef.current.forEach((meal, index) => {
      if (index > 5) {
        meal.classList.toggle("dep");
      }
    });
  };

  const handleSlide = (e) => {
    const len = mealRef.current.length;

    if (!isInViewport(mealRef.current[0])) {
      document.querySelector(".prev").style.display = "block";
    } else if (isInViewport(mealRef.current[0])) {
      document.querySelector(".prev").style.display = "none";
    }

    if (isInViewport(mealRef.current[len - 1])) {
      document.querySelector(".next").style.display = "none";
    } else if (!isInViewport(mealRef.current[len - 1])) {
      document.querySelector(".next").style.display = "block";
    }

    if (e.currentTarget.className === "next") {
      document.querySelector(".grid-con").scrollLeft += 270;
    } else if (e.currentTarget.className === "prev") {
      document.querySelector(".grid-con").scrollLeft -= 270;
    }
  };

  // useEffect(() => {
  //   // navigator.geolocation.getCurrentPosition(success);

  //   // function success(position) {
  //   //   console.log(position);

  //   //   let lat = position.coords.latitude;
  //   //   let lng = position.coords.longitude;

  //   //   setUserGeoPos({ lat, lng });
  //   // }
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`/restaurants`);
  //       setRestaurants(data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loader">
          <CircularProgress size="40px" thickness={4} />
        </div>
      ) : (
        <>
          <section className="food-inspire">
            <div className="food-grid-con">
              <h4>Inspiration for your first order</h4>
              <div className="grid-con">
                {meals.map((meal, index) => (
                  <div
                    className={index > 5 ? "grid-item dep" : "grid-item"}
                    key={index}
                    ref={(el) => {
                      mealRef.current[index] = el;
                    }}
                  >
                    <div>
                      <img src={meal.img} alt="" />
                    </div>
                    <div>
                      <p>{meal.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="prev" onClick={handleSlide}>
                <ArrowBackIos />
              </button>
              <button className="next" onClick={handleSlide}>
                <ArrowForwardIos />
              </button>
              <button className="coll-btn" onClick={handleClick}>
                see more
                <div className="input-icon">
                  <ExpandMore />
                </div>
              </button>
            </div>
          </section>

          <section className="brands container">
            <div className="app-promotion">
              <div className="pro-exc" ref={(el) => (promoRef.current[0] = el)}>
                <div>
                  <h4>Unlock exclusive offers</h4>
                  <p>
                    Enjoy up to <span style={{ color: "#ed5a6b" }}>50% off</span> on ordering <br /> from the
                    app
                  </p>
                  <button className="app-pro-btn">Use App</button>
                </div>
                <div>
                  <img src="" alt="" />
                </div>
              </div>
              <div className="pro-del pro-dep" ref={(el) => (promoRef.current[1] = el)}>
                <div>
                  <h4>Track delivery to your door</h4>
                  <p>
                    Live order tracking only on <br /> our app
                  </p>
                  <button className="app-pro-btn">Use App</button>
                </div>
                <div>
                  <img src={deliverySec} alt="" />
                </div>
              </div>
            </div>

            <div className="top-brands">
              <h4>Top brands in spotlight</h4>
              <div>
                {brands.map((brand, index) => (
                  <div key={index}>
                    <img src={brand.img} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="best-food-list container">
            <h4>Best Food within your location</h4>
            <div className="best-food-con">
              {restaurants.map((restaurant) => (
                <Restaurant key={restaurant.id} restaurant={restaurant} meals={meals} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
