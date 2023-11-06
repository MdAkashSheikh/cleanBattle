import axios from "axios";
import { URL } from "./SourceDataService";

export const PotentialCustomerService = {

    async postPotential(name, details) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/post-potential`, data);
    },

    async editPotential(name, details, _id) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/edit-potential/` + _id, data);
    },

    async getPotential() {
        const resposnse = await axios.get(`${URL}/get-potential`);
        return resposnse;
    },

    async deletePotential(_id) {
        await axios.delete(`${URL}/delete-potential/` + _id);
    },

    async togglePotential(is_active, _id) {
        const data = {
            is_active,
        }
        await axios.post(`${URL}/toggle-potential/` + _id, data);
    }
}