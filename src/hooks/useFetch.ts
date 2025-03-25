import { useCallback } from "react";
import { customAxios } from "../../libs/axios";

/**
 * @description Custom hook for making HTTP requests using Axios with token-based authentication.
 * @returns {Object} An object containing functions for making various HTTP requests.
 */

function useFetch() {
  /**
   * @description Performs a HTTP GET request.
   * @param {string} url - The URL to make the GET request to.
   * @returns {Promise<Object>} A Promise that resolves to an object with success, data, and status properties.
   */
  const get = useCallback(async (url: string) => {
    try {
      const response = await customAxios.get(url);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: (error as { response: { data: { message: string } } })?.response
          ?.data?.message,
        status: (error as { response: { status: number } })?.response?.status,
      };
    }
  }, []);

  /**
   * @description Performs a HTTP POST request.
   * @param {string} url - The URL to make the POST request to.
   * @param {Object} data - The data to include in the POST request body.
   * @returns {Promise<Object>} A Promise that resolves to an object with success, data, and status properties.
   */
  const post = useCallback(async (url: string, data?: unknown, config = {}) => {
    try {
      const response = await customAxios.post(url, data, config);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: (error as { response: { data: { message: string } } })?.response
          ?.data?.message,
        status: (error as { response: { status: string } })?.response?.status,
      };
    }
  }, []);

  /**
   * @description Performs a HTTP PUT request.
   * @param {string} url - The URL to make the PUT request to.
   * @param {Object} data - The data to include in the PUT request body.
   * @returns {Promise<Object>} A Promise that resolves to an object with success, data, and status properties.
   */
  const put = async (url: string, data: unknown, config = {}) => {
    try {
      const response = await customAxios.put(url, data);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        data: (error as { response: { data: { message: string } } })?.response
          ?.data?.message,
        status: (error as { response: { status: string } })?.response?.status,
      };
    }
  };

  /**
   * @description Performs a HTTP DELETE request.
   * @param {string} url - The URL to make the DELETE request to.
   * @returns {Promise<Object>} A Promise that resolves to an object with success, data, and status properties.
   */
  const remove = async (url: string, id: string) => {
    try {
      const response = await customAxios.delete(`${url}/${id}`);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        data: (error as { response: { data: { message: string } } })?.response
          ?.data?.message,
        status: (error as { response: { status: string } })?.response?.status,
      };
    }
  };

  return { get, post, put, remove };
}

export { useFetch };
