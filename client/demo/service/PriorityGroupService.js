import axios from "axios";
import { URL } from "./SourceDataService";

export const PriorityGroupService = {
    async postPriority(name, details) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/post-priority`, data);
    },

    async editPriority(name, details, _id) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/edit-priority/` + _id, data);
    },

    async getPriority() {
        const response = await axios.get(`${URL}/get-priority`);
        return response;
    },

    async deletePriority(_id) {
        await axios.delete(`${URL}/delete-priority/` + _id);
    },

    async togglePriority(is_active, _id) {
        const data = {
            is_active
        }
        await axios.post(`${URL}/toggle-priority/` + _id, data);
    }
}