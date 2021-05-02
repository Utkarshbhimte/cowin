import { DistrictOptions } from "@/components/DistrictOptions";
import SessionGrid from "@/components/SessionGrid";
import { StateOptions } from "@/components/StateOptions";
import Footer from "@/components/Footer";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { NextSeo } from "next-seo";

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
      <div className="min-h-screen">
        <div className="container mx-auto px-2 lg:px-0 py-12 min-h-screen">
          <div className="w-full max-w-4xl px-3 mb-6 md:mb-0 mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-bold text-6xl">Cowin</h1>
              <a
                href="https://github.com/Utkarshbhimte/cowin"
                target="_blank"
                rel="no referrer no opener"
              >
                <button className="py-2 px-4 rounded-md inline-flex hover:bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    className="mr-2"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Source</span>
                </button>
              </a>
            </div>
            <p
              style={{ borderLeft: "4px solid rgba(67, 56, 202)" }}
              className="border-indigo-500 px-4 border-t-2 py-2 my-8"
            >
              <strong>Disclaimer:</strong> There is a delay in the data shown
              here. <br />
              If you want the vaccine urgently, I suggest you to check out{" "}
              <a
                className="text-indigo-700"
                href="https://selfregistration.cowin.gov.in/appointment"
              >
                the official website
              </a>
            </p>
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
        <Footer />
      </div>
    </>
  );
}

Home.layoutProps = {
  Layout: (props: any) => <div {...props} />,
};
