import axios from "axios";
import { URL } from "./SourceDataService";

export const ZoneService = {
    async postZone(name, details) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/post-zone`, data);
    },

    async editZone(name, details, _id) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/edit-zone/` + _id, data);
    },

    async getZone() {
        const response = await axios.get(`${URL}/get-zone`);
        return response;
    },

    async deleteZone(_id) {
        await axios.delete(`${URL}/delete-zone/` + _id);
    },

    async toggleZone(is_active, _id) {
        const data = {
            is_active,
        }
        await axios.post(`${URL}/toggle-zone/` + _id, data);
    },
}