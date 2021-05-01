import { getToday } from "@/utils";

export interface SessionResponse {
  sessions: Session[];
}

export interface Session {
  center_id: number;
  name: string;
  state_name: string;
  district_name: string;
  block_name: string;
  pincode: number;
  from: string;
  to: string;
  lat: number;
  long: number;
  fee_type: string;
  session_id: string;
  date: string;
  available_capacity: number;
  fee: string;
  min_age_limit: number;
  vaccine: string;
  slots: string[];
}

export const getSessions = async (
  selectedDistrictId: string
): Promise<SessionResponse> => {
  if (!selectedDistrictId) {
    return { sessions: [] };
  }

  const request = await fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selectedDistrictId}&date=${getToday()}`
  );
  return request.json();
};
