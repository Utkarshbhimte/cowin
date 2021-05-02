import { ChangeEventHandler } from "react";
import { useQuery } from "react-query";
import { StateResponse, getStates } from "src/services/getStates";

interface StateOptionsProps {
  onChange: (state: string) => void;
  value: string | null;
}
export const StateOptions: React.FC<StateOptionsProps> = ({
  onChange,
  value,
}) => {
  const { isLoading, error, data: stateOptions } = useQuery<StateResponse>(
    ["stateOptions"],
    getStates
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
      <div className="mb-2">State</div>
      <div className="flex">
        <select
          onChange={handleChange}
          value={value || undefined}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {stateOptions?.states.map((state) => (
            <option key={state.state_id} value={state.state_id}>
              {state.state_name}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
};
