import React from "react";
import { useQuery } from "react-query";
import { getSessions, SessionResponse } from "src/services/getSessions";
import CenterCard from "./CenterCard";

interface SessionGridProps {
  selectedDistrictId: string;
}
const SessionGrid: React.FC<SessionGridProps> = ({ selectedDistrictId }) => {
  const { isLoading, error, data } = useQuery<SessionResponse>(
    ["sessions", selectedDistrictId],
    () => getSessions(selectedDistrictId)
  );

  if (isLoading) {
    return <div className="text-center">Loading</div>;
  }
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {data?.centers
        ?.filter((c) => c.sessions?.find((s) => s.min_age_limit == 18))
        .map((c) => (
          <CenterCard key={c.center_id} center={c} />
        ))}
    </div>
  );
};

export default SessionGrid;
