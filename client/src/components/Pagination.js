import { useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { RestaurantContext } from "../context/RestaurantContextProvider";

const PaginationControlled = () => {
  const { page, total, dispatch } = useContext(RestaurantContext);
  let mqSm = window.matchMedia("(max-width: 600px)");

  const handleChange = (event, value) => {
    dispatch({ type: "SET_PAGE", payload: value });
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
