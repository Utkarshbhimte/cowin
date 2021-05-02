import { ChangeEventHandler } from "react";
import { useQuery } from "react-query";
import { DistrictResponse, getDistricts } from "src/services/getDistricts";
import { StateResponse } from "src/services/getStates";

interface DistrictOptionsProps {
  selectedState: string;
  onChange: (district: string) => void;
  value: string | null;
}
export const DistrictOptions: React.FC<DistrictOptionsProps> = ({
  selectedState,
  onChange,
  value,
}) => {
  const {
    isLoading,
    error,
    data: districtOptions,
  } = useQuery<DistrictResponse>(["districtOptions", selectedState], () =>
    getDistricts(selectedState)
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
          value={value || undefined}
          onChange={handleChange}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {districtOptions?.districts?.map((d) => (
            <option key={d.district_id} value={d.district_id}>
              {d.district_name}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};
