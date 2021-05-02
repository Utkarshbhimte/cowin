import { copyTextToClipboard } from "@/utils/copyToClipboard";
import cx from "classNames";
import React from "react";
import { Center } from "src/services/getSessions";

const dateFormat = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date.split("-").reverse().join("-")));
};

const CenterCard: React.FC<{ center: Center }> = ({ center }) => {
  const handleCopyButtonClick = () => {
    copyTextToClipboard(center.name);
    setTimeout(() => {
      window.open(
        "https://selfregistration.cowin.gov.in/appointment",
        "_blank"
      );
    }, 0);
  };
  return (
    <div className="p-4 rounded-md  broder border border-gray-300 flex flex-col justify-between">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">{center.name}</h2>
        <button
          onClick={handleCopyButtonClick}
          className="p-4 rounded-md hover:bg-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>
      <div className="text-xs">
        <h4 className="font-medium mb-2 uppercase text-gray-500 tracking-wide">
          Sessions
        </h4>
        <div>
          {center.sessions.map((s) => (
            <span
              className={cx(
                "mr-2 mb-2 inline-block py-1 px-2 rounded-md",
                !s.available_capacity && "border border-gray-300",
                s.available_capacity > 10 && "text-white bg-indigo-700",
                !!s.available_capacity &&
                  s.available_capacity <= 10 &&
                  "bg-red-400 text-white"
              )}
              key={s.session_id}
            >
              {dateFormat(s.date)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
