// import { useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
// import { RestaurantContext } from "../context/RestaurantContextProvider";

const PaginationControlled = ({ page, total, dispatch, is }) => {
  // const  = useContext(RestaurantContext);
  let mqSm = window.matchMedia("(max-width: 600px)");

  const handleChange = (event, value) => {
    if (is) {
      dispatch(value);
    } else {
      dispatch({ type: "SET_PAGE", payload: value });
    }
  };

  return (
    <div className="pagination cen-grid">
      <Pagination
        count={Math.ceil(total / 30)}
        siblingCount={mqSm.matches ? 1 : 5}
        shape="rounded"
        variant="outlined"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationControlled;
