import { departure, arrival, calendar, person } from "../assets/icons";
import { format } from "date-fns";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import ExploreForm from "./ExploreForm";

const SelectDetails = () => {
  const currentFlight = JSON.parse(localStorage.getItem("currentFlight"));
  console.log("Current Flight is: ", currentFlight);
  return (
    <>
      <ExploreForm />
    </>
  );
};

export default SelectDetails;
