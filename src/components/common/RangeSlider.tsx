import { Dispatch, SetStateAction } from "react";
import { Range } from "react-range";

type RangeSliderProps = {
  setByPrice: Dispatch<SetStateAction<string>>;
  setValues: Dispatch<SetStateAction<any>>;
  values: any;
};

const RangeSlider: React.FC<RangeSliderProps> = ({
  setByPrice,
  setValues,
  values,
}) => {
  const minRange = 1000; // Minimum value of the slider
  const maxRange = 500000; // Maximum value of the slider

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between w-full mb-4">
          <p className=" text-xs font-subHeading2 text-gray-700">
            N{values[0].toLocaleString()}
          </p>
          <p className=" text-xs font-subHeading2 text-gray-700">
            N{values[1].toLocaleString()}
          </p>
        </div>
        <Range
          step={1}
          min={minRange}
          max={maxRange}
          values={values}
          onChange={(newValues) => {
            setValues(newValues);
            setByPrice(`${values[0]}-${values[1]}`);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full h-1 bg-secondary-dark rounded-lg"
              style={{ ...props.style }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-3 w-3 bg-secondary-dark rounded-full focus:outline-none focus:ring-2 focus:bg-secondary-dark"
            />
          )}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
