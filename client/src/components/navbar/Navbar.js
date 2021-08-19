import { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SwapVert, FilterList, Cancel } from "@material-ui/icons";
import Nav from "./Nav";
import nutritionPri from "../../img/nav/plan (1).png";
import { RestaurantContext } from "../../context/RestaurantContextProvider";
import nutritionSec from "../../img/nav/plan.png";
import nightlifePri from "../../img/nav/whiskey (1).png";
import nightlifeSec from "../../img/nav/whiskey.png";
import deliveryPri from "../../img/nav/delivery-man.png";
import deliverySec from "../../img/nav/delivery-man (1).png";
import mealPri from "../../img/nav/breakfast (1).png";
import mealSec from "../../img/nav/breakfast.png";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const [imgSwap, setImgSwap] = useState("Delivery");
  const [scroll, setScroll] = useState(false);
  const [reset, setReset] = useState(false);
  const mqSm = window.matchMedia("(max-width: 600px)");
  const mqXl = window.matchMedia("(min-width: 601px)");

  const myScroll = () => {
    const filCon = document.querySelector(".filter-con");
    let currentScrollPos = window.scrollY;
    if (mqSm.matches) {
      if (0 >= currentScrollPos) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    } else if (mqXl.matches && filCon) {
      if (currentScrollPos >= filCon.parentNode.offsetTop + 159) {
        filCon.classList.add("fil-sticky");
      } else {
        filCon.classList.remove("fil-sticky");
      }
    }
  };

  const navClick = (e, path) => {
    const li = e.currentTarget;
    setImgSwap(li.innerText);
    document.querySelector(".nav-menu .active").classList.remove("active");
    li.classList.add("active");
    history.push(path);
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    setReset(true);
    // setScroll(false);
    const ul = document.querySelector(".nav-menu ul").childNodes;

    ul.forEach((li, index) => {
      if (location.pathname === "/dine-out" && index === 1) {
        document.querySelector(".nav-menu .active").classList.remove("active");
        li.classList.add("active");
      } else if (location.pathname === "/nightlife" && index === 2) {
        document.querySelector(".nav-menu .active").classList.remove("active");
        li.classList.add("active");
      } else if (location.pathname === "/nutrition" && index === 3) {
        document.querySelector(".nav-menu .active").classList.remove("active");
        li.classList.add("active");
      } else if (location.pathname === "/" && index === 0) {
        document.querySelector(".nav-menu .active").classList.remove("active");
        li.classList.add("active");
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    setReset(false);
  }, [reset]);

  useEffect(() => {
    window.addEventListener("scroll", myScroll);
    return () => {
      window.removeEventListener("scroll", myScroll);
    };
  });

  return (
    <div className="container">
      {location.pathname === "/" ? (
        <header className={scroll ? "sticky" : ""}>
          <Nav location={location} history={history} />

          <div className="nav-menu">
            <ul>
              <li className="active" onClick={(e) => navClick(e, "/")}>
                <div>
                  <img src={imgSwap === "Delivery" ? deliverySec : deliveryPri} alt="" />
                </div>
                <p>Delivery</p>
              </li>
              <li onClick={(e) => navClick(e, "/dine-out")}>
                <div>
                  <img src={imgSwap === "Dining Out" ? mealSec : mealPri} alt="" />
                </div>
                <p>Dining Out</p>
              </li>
              <li onClick={(e) => navClick(e, "/nightlife")}>
                <div>
                  <img src={imgSwap === "Nightlife" ? nightlifeSec : nightlifePri} alt="" />
                </div>
                <p>Nightlife</p>
              </li>
              <li onClick={(e) => navClick(e, "/nutrition")}>
                <div>
                  <img src={imgSwap === "Nutrition" ? nutritionSec : nutritionPri} alt="" />
                </div>
                <p>Nutrition</p>
              </li>
            </ul>
          </div>

          <hr className="nav-menu-hr" />

          <div className="filter-con">
            <Filters history={history} />
          </div>
          <div className="fil-scroll-backup"></div>
        </header>
      ) : (
        <header
          className={scroll ? "sticky2" : ""}
          style={!mqXl.matches ? { paddingBottom: "5px", borderBottom: "1px solid #3636361a" } : null}
        >
          <Nav location={location} history={history} />

          <div className="nav-menu">
            <ul>
              <li className="active" onClick={(e) => navClick(e, "/")}>
                <div>
                  <img src={imgSwap === "Delivery" ? deliverySec : deliveryPri} alt="" />
                </div>
                <p>Delivery</p>
              </li>
              <li onClick={(e) => navClick(e, "/dine-out")}>
                <div>
                  <img src={imgSwap === "Dining Out" ? mealSec : mealPri} alt="" />
                </div>
                <p>Dining Out</p>
              </li>
              <li onClick={(e) => navClick(e, "/nightlife")}>
                <div>
                  <img src={imgSwap === "Nightlife" ? nightlifeSec : nightlifePri} alt="" />
                </div>
                <p>Nightlife</p>
              </li>
              <li onClick={(e) => navClick(e, "/nutrition")}>
                <div>
                  <img src={imgSwap === "Nutrition" ? nutritionSec : nutritionPri} alt="" />
                </div>
                <p>Nutrition</p>
              </li>
            </ul>
          </div>

          <hr className="nav-menu-hr" />
        </header>
      )}
      <div className="scroll-backup"></div>
    </div>
  );
};

function Filters({ history }) {
  const { term, isSearch, dispatch } = useContext(RestaurantContext);
  const [filtNo, setFiltNo] = useState(0);
  console.log(filtNo);

  const clearTerm = (e) => {
    dispatch({ type: "CLEAR_TERM", payload: "" });
    if (filtNo >= 1) {
      setFiltNo(filtNo - 1);
    } else {
      setFiltNo(0);
    }
    history.push("/");
  };

  const handleRating = (e) => {
    e.currentTarget.classList.toggle("add-pri");
    if (e.currentTarget.classList.contains("add-pri")) {
      dispatch({ type: "SET_RATING", payload: 4 });
      setFiltNo(filtNo + 1);
    } else {
      dispatch({ type: "CLEAR_RATING" });
      if (filtNo >= 1) {
        setFiltNo(filtNo - 1);
      } else {
        setFiltNo(0);
      }
    }
  };
  return (
    <div>
      <ul>
        <li>
          {isSearch ? (
            <div
              style={{
                background: "#ed5a6b",
                color: "#fff",
                marginRight: "4px",
                padding: "0 5px",
                borderRadius: "3px",
              }}
            >
              {filtNo + 1}
            </div>
          ) : (
            <div>
              {filtNo ? (
                <div
                  style={{
                    background: "#ed5a6b",
                    color: "#fff",
                    marginRight: "4px",
                    padding: "0 5px",
                    borderRadius: "3px",
                  }}
                >
                  {filtNo}
                </div>
              ) : (
                <FilterList />
              )}
            </div>
          )}
          <p>Filters</p>
        </li>
        {isSearch ? (
          <li style={{ background: "#ed5a6b", color: "#fff" }} onClick={clearTerm}>
            <p>{term}</p>
            <div className="cen-grid" style={{ marginLeft: "4px" }}>
              <Cancel style={{ color: "#ddd" }} fontSize="small" />
            </div>
          </li>
        ) : (
          ""
        )}
        <li onClick={handleRating}>
          <p>Rating: 4.0+</p>
        </li>
        <li>
          <div>
            <SwapVert />
          </div>
          <p>Delivery Time</p>
        </li>
        <li>
          <p>Great Offers</p>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
