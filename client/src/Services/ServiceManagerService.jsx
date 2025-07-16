import axios from "axios";

const API_URL = "http://localhost:5000/api/serviceManager"; // Updated to match backend server

const ServiceManagerService = {
  getRequestsByUser: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/requests?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching service requests:", error);
      throw error;
    }
  },

  submitServiceRequest: async (requestData) => {
    try {
      const response = await axios.post(`${API_URL}/request`, requestData);
      return response.data;
    } catch (error) {
      console.error("Error submitting service request:", error);
      throw error;
    }
  },

  acceptRequest: async (requestId) => {
    try {
      const response = await axios.put(`${API_URL}/accept`, { requestId });
      return response.data;
    } catch (error) {
      console.error("Error accepting request:", error);
      throw error;
    }
  },

  rejectRequest: async (requestId) => {
    try {
      const response = await axios.delete(`${API_URL}/reject`, { data: { requestId } });
      return response.data;
    } catch (error) {
      console.error("Error rejecting request:", error);
      throw error;
    }
  },

  getAllServiceRequests: async () => {
    try {
      const response = await axios.get(`${API_URL}/allRequests`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all service requests:", error);
      throw error;
    }
  },
};

export default ServiceManagerService;