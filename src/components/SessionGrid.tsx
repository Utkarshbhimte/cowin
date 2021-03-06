import React from "react";
import { useQuery } from "react-query";
import { Center, getSessions, SessionResponse } from "src/services/getSessions";
import CenterCard from "./CenterCard";

const getAllAvailSessionCount = (center: Center) => {
  return center.sessions.reduce(
    (total, curr) => total + curr.available_capacity,
    0
  );
};
const centerCompare = (firstEl: Center, secondEl: Center): 1 | -1 | 0 => {
  if (getAllAvailSessionCount(firstEl) > getAllAvailSessionCount(secondEl)) {
    return -1;
  }

  if (getAllAvailSessionCount(firstEl) < getAllAvailSessionCount(secondEl)) {
    return 1;
  }

  return 0;
};

interface SessionGridProps {
  selectedDistrictId: string;
}
const SessionGrid: React.FC<SessionGridProps> = ({ selectedDistrictId }) => {
  const { isLoading, data } = useQuery<SessionResponse>(
    ["sessions", selectedDistrictId],
    () => getSessions(selectedDistrictId),
    { refetchInterval: 10000 }
  );

  if (isLoading) {
    return <div className="text-center">Loading</div>;
  }

  const centers = data?.centers
    ?.filter((c) => c.sessions?.find((s) => s.min_age_limit == 18))
    .sort(centerCompare);

  const availCenters = centers?.filter((c) =>
    c.sessions.find((s) => s.available_capacity)
  );
  return (
    <div>
      {!availCenters?.length && (
        <h3 className="text-center font-bold text-3xl my-12">
          There are no available slots in 18+ vaccination centers in this
          district
        </h3>
      )}
      <div className="grid md:grid-cols-3 gap-4">
        {centers?.map((c) => (
          <CenterCard key={c.center_id} center={c} />
        ))}
      </div>
    </div>
  );
};

export default SessionGrid;
