import api from "./api";

export interface Investigation {
    id?: number;
    fir_id: number;
    officer: string;
    notes: string;
    progress: number;
    status: string;
}

export const getInvestigations = async () => {
    const res = await api.get("/investigations");
    return res.data;
};

export const getInvestigation = async (id: number) => {
    const res = await api.get(`/investigations/${id}`);
    return res.data;
};

export const createInvestigation = async (data: Investigation) => {
    const res = await api.post("/investigations", data);
    return res.data;
};

export const updateInvestigation = async (
    id: number,
    data: Investigation
) => {
    const res = await api.put(`/investigations/${id}`, data);
    return res.data;
};