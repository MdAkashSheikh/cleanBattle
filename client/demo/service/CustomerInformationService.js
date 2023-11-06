import axios from "axios";
import { URL } from "./SourceDataService";

export const CustomerInformationService = {
    async postCustomerInfo(zone, category, name, address, asset, phone, email, whatsapp, details ) {
        const data = {
            zone,
            category,
            name,
            address,
            asset,
            phone, 
            email,
            whatsapp,
            details
        }
        await axios.post(`${URL}/post-customer-info`, data);
    },

    async editCustomerInfo(zone, category, name, address, asses, phone, email, whatsapp, details, _id) {
        const data = {
            zone,
            category,
            name,
            address,
            asses,
            phone,
            email,
            whatsapp,
            details
        }
        await axios.post(`${URL}/edit-customer-info/` + _id, data);
    },

    async getCustomerInfo(){
        const response = await axios.get(`${URL}/get-customer-info`);
        return response;
    },

    async deleteCustomerInfo(_id) {
        await axios.delete(`${URL}/delete-customer-info/` + _id);
    },

    async toggleCustomerInfo(is_active, _id) {
        const data = {
            is_active,
        }
        await axios.post(`${URL}/toggle-customer-info/` + _id, data);
    },

    async editManagerPanel(follows, _id) {
        const data = {
            follows
        }
        await axios.post(`${URL}/edit-manager-panel/` + _id, data);
    }
}