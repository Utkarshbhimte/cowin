

export interface StateResponse {
    states: {
        state_id: number;
        state_name: string;
    }[]
}
export const getStates = async (): Promise<StateResponse> => {
    const request = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/states`)
    return request.json()
}