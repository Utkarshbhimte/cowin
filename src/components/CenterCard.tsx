import React from "react";
import { copyTextToClipboard } from "@/utils/copyToClipboard";
import { Center } from "src/services/getSessions";
import { getWindow } from "src/utils/getWindow";

// @ts-ignore
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
      getWindow()?.open(
        "https://selfregistration.cowin.gov.in/appointment",
        "_blank"
      );
    }, 0);
  };

  const validSessions = center.sessions.filter((s) => s.available_capacity);
  return (
    <div
      className={`p-4 rounded-md  broder border border-gray-300 flex flex-col justify-between ${
        !validSessions.length ? "opacity-50" : "border-indigo-700"
      }`}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">{center.name}</h2>
      </div>
      <div className="text-xs">
        <h4 className="font-medium mb-2 uppercase text-gray-500 tracking-wide">
          Sessions
        </h4>
        <div className="grid gap-3">
          {validSessions.map((s) => (
            <div
              className={
                `py-1 px-2 rounded-md mr-2 flex justify-between items-center` +
                (!s.available_capacity ? `border border-gray-300` : "") +
                (s.available_capacity > 10
                  ? "text-indigo-700 border border-indigo-700"
                  : "") +
                (!!s.available_capacity &&
                  s.available_capacity <= 10 &&
                  "text-red-400 border border-red-400")
              }
              key={s.session_id}
            >
              <span>{dateFormat(s.date)} </span>
              {!!s.available_capacity && (
                <span>
                  <strong>Available:</strong> {s.available_capacity}
                </span>
              )}
            </div>
          ))}

          {!validSessions.length && (
            <span>There are available session here</span>
          )}

          <div className="flex">
            <a
              target="_blank"
              rel="no referrer no opener"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                [
                  center.name,
                  center.district_name,
                  center.pincode,
                  center.sessions,
                ].join(", ")
              )}`}
            >
              <button className="p-2 rounded-md hover:bg-gray-200 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
            <button
              onClick={handleCopyButtonClick}
              className="p-2 rounded-md hover:bg-gray-200"
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
        </div>
      </div>
    </div>
  );
};

export default CenterCard;
