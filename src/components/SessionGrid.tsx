import React from "react";
import { useQuery } from "react-query";
import { getSessions, SessionResponse } from "src/services/getSessions";

interface SessionGridProps {
  selectedDistrictId: string;
}
const SessionGrid: React.FC<SessionGridProps> = ({ selectedDistrictId }) => {
  const { isLoading, error, data } = useQuery<SessionResponse>(
    ["sessions", selectedDistrictId],
    () => getSessions(selectedDistrictId)
  );
  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.sessions
        // ?.filter((a) => a.min_age_limit == 18)
        .map((s) => (
          <div className="p-4 rounded-lg">
            <h4 className="font-3xl">{s.name}</h4>
          </div>
        ))}
    </div>
  );
};

export default SessionGrid;
