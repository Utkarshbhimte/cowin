export interface DistrictResponse {
  districts: {
    district_id: number;
    district_name: string;
  }[];
}
export const getDistricts = async (
  selectedStateId: string
): Promise<DistrictResponse> => {
  if (!selectedStateId) {
    return { districts: [] };
  }

  const request = await fetch(
    `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateId}`
  );
  return request.json();
};
