import api from "./api";

export interface FIR {
    fir: string;
    crime: string;
    district: string;
    police_station: string;
    address: string;
    latitude: number;
    longitude: number;
    priority: string;
    status: string;
    evidence: string;
    date: string;
}

export const getFIRs = async () => {
    const response = await api.get("/firs");
    return response.data;
};

export const createFIR = async (fir: FIR) => {
    const response = await api.post("/firs", fir);
    return response.data;
};

export const deleteFIR = async (id: number) => {
    const response = await api.delete(`/firs/${id}`);
    return response.data;
};

export const updateFIR = async (id: number, fir: FIR) => {
    const response = await api.put(`/firs/${id}`, fir);
    return response.data;
};