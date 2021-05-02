import { getToday } from "@/utils";

export interface SessionResponse {
  centers: Center[];
}

export interface Center {
  center_id: number;
  name: string;
  state_name: string;
  district_name: string;
  block_name: string;
  pincode: number;
  lat: number;
  long: number;
  from: string;
  to: string;
  fee_type: string;
  sessions: Session[];
  vaccine_fees?: VaccineFee[];
}

export interface Session {
  session_id: string;
  date: string;
  available_capacity: number;
  min_age_limit: number;
  vaccine: string;
  slots: string[];
}

export interface VaccineFee {
  vaccine: string;
  fee: string;
}

export const getSessions = async (
  selectedDistrictId: string
): Promise<SessionResponse> => {
  if (!selectedDistrictId) {
    return { centers: [] };
  }

  const request = await fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${selectedDistrictId}&date=${getToday()}`
  );
  return request.json();
};
