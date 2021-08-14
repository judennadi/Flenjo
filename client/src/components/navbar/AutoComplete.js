import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContextProvider";

const AutoComplete = ({ restaurantSearch, setRestaurantSearch, isST, setIsST }) => {
  const { dispatch } = useContext(RestaurantContext);
  const history = useHistory();
  const location = useLocation();
  const [searchTerms, setSearchTerms] = useState([]);

  const handleClick = (e) => {
    dispatch({ type: "SET_TERM", payload: e.currentTarget.childNodes[0].textContent });
    setSearchTerms([]);
    if (location.pathname !== "/") history.push("/");
  };

  // if (searchTerms.length) {
  //   setIsST(true);
  // }
  useEffect(() => {
    console.log(isST);
    if (isST === false) {
      document.querySelector(".autocomplete-con ul").style.display = "none";
    } else {
      document.querySelector(".autocomplete-con ul").style.display = "block";
    }
  }, [isST]);

  useEffect(() => {
    if (restaurantSearch.length >= 3) {
      const fetchData = async () => {
        console.log("fetch called");
        try {
          const { data } = await axios.get(`/api/restaurants/search/autocomplete?text=${restaurantSearch}`);
          setSearchTerms(data.terms);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    } else if (!restaurantSearch) {
      setSearchTerms([]);
    } else {
      setSearchTerms([]);
    }
  }, [restaurantSearch]);

  return (
    <div className="autocomplete-con">
      <ul style={{ listStyle: "none" }}>
        {searchTerms.map((x, i) => (
          <li key={i} onClick={handleClick}>
            <p>{x.alias ? x.title : x.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;