import axios from "axios";

const URL = "http://localhost:3000/companies";

export async function getCompaniesApi() {
    try {
        const response = await axios.get(URL)
        if (response.status === 200) {
            return response.data;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export async function getCompanyApi(id) {
    try {
        const response = await axios.get(URL + "/" + id);
        if (response.status === 200) {
            return response;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export async function createCompanyApi(company) {
    try {
        const response = await axios.post(URL, company);
        if (response.status === 200) {
            return response;
        }
    }
    catch (error)
    {
        console.log(error);
        return null;
    }
}

export async function editCompanyApi(id, company) {
    try {
        const response = await axios.put(URL + "/" + id, company);
        return response.status === 200;
    }
    catch (error)
    {
        console.log(error);
    }
}