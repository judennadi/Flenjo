import { useRef, useContext } from "react";
import { ArrowBackIos, ArrowForwardIos, ExpandMore } from "@material-ui/icons";
import { RestaurantContext } from "../context/RestaurantContextProvider";
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
import RestaurantCard from "./RestaurantCard";
import { CircularProgress } from "@material-ui/core";
import Pagination from "./Pagination";

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
  const { restaurants, term, isLoading, isSubLoading, isError } = useContext(RestaurantContext);
  // const [restaurants, setRestaurants] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isSubLoading, setIsSubLoading] = useState(false);
  // const [isError, setIsError] = useState(true);
  // const [page, setPage] = useState(1);
  // const [total, setTotal] = useState(null);
  const mealRef = useRef([]);
  const promoRef = useRef([]);
  const mqXl = window.matchMedia("(min-width: 601px)");

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
  //   const fetchData = async () => {
  //     if (page <= 1) {
  //       setIsLoading(true);
  //       setIsSubLoading(false);
  //     } else {
  //       setIsLoading(false);
  //       setIsSubLoading(true);
  //     }
  //     setIsError(false);

  //     try {
  //       const { data } = await axios.get(`/api/restaurants?page=${page - 1}`);
  //       setRestaurants(data.data);
  //       setTotal(data.total);
  //       setIsLoading(false);
  //       setIsSubLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //       setIsError(true);
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [page]);

  // useEffect(() => {
  //   document.documentElement.scrollTop = 775;
  // }, [page]);

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
      {isLoading && !isSubLoading ? (
        <div className="loader">
          <CircularProgress size="40px" thickness={4} />
        </div>
      ) : isError ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <h4>Oops! something went wrong</h4>
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
            <h4>{term ? `Best results for: ${term}` : "Best Food within your location"}</h4>
            <div className="best-food-con">
              {isSubLoading ? (
                <div
                  className="cen-grid"
                  style={mqXl.matches ? { gridColumn: "2/3", height: "100px" } : { height: "100px" }}
                >
                  <CircularProgress size="30px" thickness={4} />
                </div>
              ) : (
                restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} meals={meals} />
                ))
              )}
            </div>
            <div>
              <Pagination />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
