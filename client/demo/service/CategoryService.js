import axios from "axios";
import { URL } from "./SourceDataService";

export const CategoryService = {
    async postCategory(name, details) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/post-category`, data);
    },

    async editCategory(name, details, _id) {
        const data = {
            name,
            details,
        }
        await axios.post(`${URL}/edit-category/` + _id, data);
    },

    async getCategory() {
        const response = await axios.get(`${URL}/get-category`);
        return response;
    },

    async deleteCategory(_id) {
        await axios.delete(`${URL}/delete-category/` + _id);
    },
    
    async toggleCategory(is_active, _id) {
        const data = {
            is_active,
        }
        await axios.post(`${URL}/toggle-category/` + _id, data);
    }
}