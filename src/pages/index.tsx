import { DistrictOptions } from "@/components/DistrictOptions";
import SessionGrid from "@/components/SessionGrid";
import { StateOptions } from "@/components/StateOptions";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getStates, StateResponse } from "src/services/getStates";

export default function Home(): JSX.Element {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const { isLoading, error, data: stateOptions } = useQuery<StateResponse>(
    ["cityOptions", selectedState],
    getStates
  );

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedDistrict(null);
    }
  }, [selectedState]);

  return (
    <>
      <NextSeo title="Home" />
      <div className="h-screen">
        <div className="container mx-auto px-8 lg:px-0 py-12">
          <h1 className="font-bold text-2xl mb-8">Enter your preferences</h1>
          <div className="w-full max-w-4xl px-3 mb-6 md:mb-0">
            <div className="grid gap-8">
              <StateOptions onChange={setSelectedState} />
              {selectedState && (
                <DistrictOptions
                  onChange={setSelectedDistrict}
                  selectedState={selectedState}
                />
              )}

              {selectedDistrict && (
                <SessionGrid selectedDistrictId={selectedDistrict} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Home.layoutProps = {
  Layout: (props: unknown) => (
    <div className="border-l-8 border-blue-700" {...props} />
  ),
};
