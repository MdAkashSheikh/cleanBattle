import axios from "axios";
import { URL } from "./SourceDataService";

export const DataGroupService = {
    async postDataGroup(name, details) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/post-data-group`, data);
    },

    async editDataGroup(name, details, _id) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/edit-data-group/` + _id, data);
    },

    async getDataGroup() {
        const response = await axios.get(`${URL}/get-data-group`);
        return response;
    },

    async deleteDataGroup(_id) {
        await axios.delete(`${URL}/delete-data-group/` + _id);
    },

    async toggleDataGroup(is_active, _id) {
        const data = {
            is_active
        }
        await axios.post(`${URL}/toggle-data-group/` + _id, data);
    }
}