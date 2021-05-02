import React from "react";
import { Center } from "src/services/getSessions";

const dateFormat = (date: string) => {};

const CenterCard: React.FC<{ center: Center }> = ({ center }) => {
  return (
    <div className="p-4 rounded-md  broder border border-gray-300 flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-4">{center.name}</h2>
      <div className="text-xs">
        <h4 className="font-medium mb-2 uppercase text-gray-500 tracking-wide">
          Sessions
        </h4>
        <div>
          {center.sessions.map((s) => (
            <span
              className="mr-2 mb-2 inline-block py-1 px-2 border border-gray-300 rounded-md"
              key={s.session_id}
            >
              {s.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
