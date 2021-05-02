import { DistrictOptions } from "@/components/DistrictOptions";
import SessionGrid from "@/components/SessionGrid";
import { StateOptions } from "@/components/StateOptions";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { NextSeo } from "next-seo";
import { useEffect } from "react";

export default function Home(): JSX.Element {
  const [selectedState, setSelectedState] = useLocalStorage<string | null>(
    "selectedState",
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useLocalStorage<
    string | null
  >("selectedDistrict", null);

  const handleStateChange = (newState: string) => {
    if (newState !== selectedState) {
      setSelectedDistrict(null);
    }
    setSelectedState(newState);
  };
  return (
    <>
      <NextSeo title="Home" />
      <div className="h-screen">
        <div className="container mx-auto px-2 lg:px-0 py-12">
          <div className="w-full max-w-4xl px-3 mb-6 md:mb-0">
            <h1 className="font-bold text-6xl mb-8">Cowin</h1>
            <div className="grid gap-8">
              <StateOptions
                value={selectedState}
                onChange={handleStateChange}
              />
              {selectedState && (
                <DistrictOptions
                  value={selectedDistrict}
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
  Layout: (props: unknown) => <div className="" {...props} />,
};
