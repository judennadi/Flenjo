import { useState, useEffect, useContext } from "react";
import { Search, LocationOn, Person } from "@material-ui/icons";
import { RestaurantContext } from "../../context/RestaurantContextProvider";
import AutoComplete from "./AutoComplete";

const Nav = ({ location, history }) => {
  const { dispatch } = useContext(RestaurantContext);
  const [scroll, setScroll] = useState(false);
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [isST, setIsST] = useState(false);
  let mql = window.matchMedia("(max-width: 600px)");
  let prevScrollPos = window.pageYOffset;

  const myScroll = () => {
    let currentScrollPos = window.pageYOffset;
    let sticky;
    if (location.pathname === "/") {
      sticky = document.querySelector(".sticky");
    } else {
      sticky = document.querySelector(".sticky2");
    }

    if (mql.matches) {
      if (prevScrollPos >= currentScrollPos) {
        if (sticky) {
          sticky.style.top = "0";
          setScroll(false);
        }
      } else {
        if (sticky) {
          sticky.style.top = "-54px";
          setScroll(true);
        }
      }
    }
    prevScrollPos = currentScrollPos;
  };

  let currentFocus = -1;
  const handleKeyUp = (e) => {
    const list = document.querySelectorAll(".autocomplete-con ul li");
    const removeActive = (x) => {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
      }
    };
    const addActive = (x) => {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("active");
    };

    if (list) {
      if (e.key === "Enter") {
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          list[currentFocus].click();
          dispatch({ type: "SET_TERM", payload: list[currentFocus].childNodes[0].textContent });
          setRestaurantSearch("");
        } else {
          dispatch({ type: "SET_TERM", payload: e.target.value });
          setRestaurantSearch("");
        }
      } else if (e.key === "ArrowUp") {
        currentFocus--;
        addActive(list);
      } else if (e.key === "ArrowDown") {
        currentFocus++;
        addActive(list);
      }
    }
  };

  const handleBlur = (e) => {
    setIsST(false);
  };

  const handleFocus = (e) => {
    setIsST(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {});

  useEffect(() => {
    window.addEventListener("scroll", myScroll);
    return () => {
      window.removeEventListener("scroll", myScroll);
    };
  });

  return (
    <>
      <nav>
        <div className="logo">
          <h2 style={{ letterSpacing: "-1px" }} onClick={() => history.push("/")}>
            FLENJO
          </h2>
        </div>
        <div className="nav-auth-sm">
          <Person color="primary" />
        </div>
        <div className="search-xl">
          <div className="input">
            <div className="input-icon">
              <LocationOn color="primary" />
            </div>
            <input type="text" />
          </div>
          <hr />
          <div className="input">
            <div className="input-icon">
              <Search />
            </div>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="cen-grid"
              style={{ width: "100%", paddingLeft: "5px", position: "relative" }}
            >
              <input
                type="text"
                value={restaurantSearch}
                placeholder="Search for restaurants, cuisine or a dish"
                onKeyUp={handleKeyUp}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setRestaurantSearch(e.target.value)}
              />
              <AutoComplete
                restaurantSearch={restaurantSearch}
                setRestaurantSearch={setRestaurantSearch}
                isST={isST}
                setIsST={setIsST}
              />
            </form>
          </div>
        </div>
        <div className="nav-auth-xl">
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </div>
      </nav>
      <div
        className="search-sm"
        style={
          location.pathname !== "/" || scroll
            ? { borderBottom: "none", height: "45px" }
            : location.pathname === "/" && searchBar
            ? { borderBottom: "none", height: "45px" }
            : null
        }
      >
        {!scroll ? (
          <SearchSm
            restaurantSearch={restaurantSearch}
            setRestaurantSearch={setRestaurantSearch}
            searchBar={searchBar}
            setSearchBar={setSearchBar}
            handleKeyUp={handleKeyUp}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isST={isST}
            setIsST={setIsST}
          />
        ) : (
          <div className="search-bar">
            <input
              type="text"
              value={restaurantSearch}
              placeholder="Search for restaurants, cuisine or a dish"
              onKeyUp={handleKeyUp}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setRestaurantSearch(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
};

// =============== SearchSm Component ===============
function SearchSm({
  restaurantSearch,
  setRestaurantSearch,
  searchBar,
  setSearchBar,
  handleKeyUp,
  handleFocus,
  handleBlur,
  setIsST,
  isST,
}) {
  const handleClick = (e) => {
    setSearchBar(true);
  };
  return (
    <>
      {searchBar ? (
        <div className="search-bar">
          <input
            type="text"
            value={restaurantSearch}
            placeholder="Search for restaurants, cuisine or a dish"
            onKeyUp={handleKeyUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setRestaurantSearch(e.target.value)}
          />
          <AutoComplete
            restaurantSearch={restaurantSearch}
            setRestaurantSearch={setRestaurantSearch}
            isST={isST}
            setIsST={setIsST}
          />
        </div>
      ) : (
        <>
          <div className="location-sm">
            <div className="input-icon">
              <LocationOn color="primary" />
            </div>
            <p>Enugu, Nigeria</p>
          </div>
          <div className="search-icon input-icon" onClick={handleClick}>
            <Search />
          </div>
        </>
      )}
    </>
  );
}

export default Nav;
