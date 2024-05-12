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
