import { Link } from "react-router-dom";
import { FlightChoose, SelectDetails } from "../components";
import { useLocation } from 'react-router-dom';


const FlightExplore = ({}) => {
  return (
      <div className="flex flex-col w-full px-8">
          <SelectDetails />
          <FlightChoose />
      </div>
  );
};

export default FlightExplore;
