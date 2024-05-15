import axios, { AxiosResponse } from 'axios';

export async function getJson(url: string): Promise<AxiosResponse> {
    try {
        const response = await axios.get(url)
        return response;
    }
    catch (error) {
        console.error(`Failed to fetch data from ${url}`, error);
        throw error;
    }
}

export async function postJson(url: string, data: any): Promise<AxiosResponse> {
    try {
        const response = await axios.post(url, data);
        return response;
    } catch (error) {
        console.error(`Failed to post data to ${url}`, error);
        throw error;
    }
}

export async function putJson(url: string, data: any): Promise<AxiosResponse> {
    try {
        const response = await axios.put(url, data);
        return response
    } catch (error) {
        console.error(`Failed to update data at ${url}`, error);
        throw error;
    }
}

export async function deleteJson(url: string): Promise<AxiosResponse> {
    try {
        const response = await axios.delete(url);
        return response;
    } catch (error) {
        console.error(`Failed to delete data from ${url}`, error);
        throw error;
    }
}