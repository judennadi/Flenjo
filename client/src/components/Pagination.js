import Pagination from "@material-ui/lab/Pagination";

const PaginationControlled = ({ page, setPage, total }) => {
  let mqSm = window.matchMedia("(max-width: 600px)");

  const handleChange = (event, value) => {
    setPage(value);
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
