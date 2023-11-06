import axios from "axios";
import { URL } from "./SourceDataService";

export const TypeOfWorkServices = {

    async postTypeWork(name, basePrice, details) {
        const data = {
            name,
            basePrice,
            details,
        }

        await axios.post(`${URL}/post-type-work`, data);
    },

    async editTypeWork(name, basePrice, details, _id) {
        const data = {
            name,
            basePrice,
            details,
        }

        await axios.post(`${URL}/edit-type-work/` + _id, data);
    },

    async getTypeWork() {
        const response = await axios.get(`${URL}/get-type-work`);
        return response;
    },

    async deleteTypeWork(_id) {
        await axios.delete(`${URL}/delete-type-work/` + _id);

    },

    async toggleTypeWork(is_active, _id) {
        const data = {
            is_active
        }

        await axios.post(`${URL}/toggle-type-work/` + _id, data);
    }
}