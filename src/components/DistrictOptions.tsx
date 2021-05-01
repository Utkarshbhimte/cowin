import { ChangeEventHandler } from "react";
import { useQuery } from "react-query";
import { DistrictResponse, getDistricts } from "src/services/getDistricts";
import { StateResponse } from "src/services/getStates";

interface DistrictOptionsProps {
  selectedState: string;
  onChange: (district: string) => void;
}
export const DistrictOptions: React.FC<DistrictOptionsProps> = ({
  selectedState,
  onChange,
}) => {
  const {
    isLoading,
    error,
    data: districtOptions,
  } = useQuery<DistrictResponse>(["districtOptions", selectedState], () =>
    getDistricts(selectedState)
  );

  console.log(
    "🚀 ~ file: DistrictOptions.tsx ~ line 19 ~ districtOptions",
    districtOptions
  );

  const handleChange: ChangeEventHandler<HTMLSelectElement> | undefined = (
    event
  ) => {
    if (!event?.target.value) {
      return;
    }
    onChange(event?.target.value);
  };

  return (
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
      <div className="mb-2">District</div>
      <div className="flex">
        <select
          onChange={handleChange}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {districtOptions?.districts?.map((d) => (
            <option value={d.district_id}>{d.district_name}</option>
          ))}
        </select>
      </div>
    </label>
  );
};
