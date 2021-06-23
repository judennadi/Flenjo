import { Star, StarHalf } from "@material-ui/icons";

// Display rating
export const StarRating = ({ value }) => {
  // let value = 3.5;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= value) {
      stars.push(
        <li key={i}>
          <Star style={{ color: "orange" }} />
        </li>
      );
    } else if (!Number.isInteger(value) && i === Math.ceil(value)) {
      stars.push(
        <li key={i}>
          <StarHalf style={{ color: "orange" }} />
        </li>
      );
    } else {
      stars.push(
        <li key={i}>
          <Star style={{ color: "rgba(0, 0, 0, 0.3)" }} />
        </li>
      );
    }
  }

  return (
    <div style={{ display: "inline-block", width: "auto" }}>
      <ul style={{ display: "inline-flex", gap: "5px", width: "auto", padding: "0" }}>{stars}</ul>
    </div>
  );
};

// Add rating
export const AddStarRating = ({ size, value, setValue }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= value) {
      stars.push(
        <li key={i} style={{ cursor: "pointer" }} onClick={() => setValue(i)}>
          <Star style={{ color: "orange" }} fontSize={size} />
        </li>
      );
    } else {
      stars.push(
        <li key={i} style={{ cursor: "pointer" }} onClick={() => setValue(i)}>
          <Star style={{ color: "rgba(0, 0, 0, 0.3)" }} fontSize={size} />
        </li>
      );
    }
  }

  return (
    <div style={{ display: "inline-block", width: "auto" }}>
      <ul style={{ display: "inline-flex", gap: "5px", width: "auto", padding: "0" }}>{stars}</ul>
    </div>
  );
};
