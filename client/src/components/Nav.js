import { useState, useEffect } from "react";
import { Search, LocationOn, Person } from "@material-ui/icons";

const Nav = ({ location, history }) => {
  const [scroll, setScroll] = useState(false);
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
          <h2 onClick={() => history.push("/")}>FLENJO</h2>
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
            <input type="text" placeholder="Search for restaurants, cuisine or a dish" />
          </div>
        </div>
        <div className="nav-auth-xl">
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </div>
      </nav>
      <div
        className="search-sm"
        style={location.pathname !== "/" || scroll ? { borderBottom: "none", height: "45px" } : null}
      >
        {!scroll ? (
          <>
            <div className="location-sm">
              <div className="input-icon">
                <LocationOn color="primary" />
              </div>
              <p>Enugu, Nigeria</p>
            </div>
            <div className="search-icon input-icon">
              <Search />
            </div>
          </>
        ) : (
          <div className="search-bar">
            <input type="text" placeholder="Search for restaurants, cuisine or a dish" />
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
