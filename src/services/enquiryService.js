import API from './api';

export const submitEnquiry = async (enquiryData) => {
  const response = await API.post('/enquiries', enquiryData);
  return response.data;
};

export const fetchEnquiries = async () => {
  const response = await API.get('/enquiries');
  return response.data;
};

export const updateEnquiryStatus = async (id, status) => {
  const response = await API.put(`/enquiries/${id}`, { status });
  return response.data;
};

export const deleteEnquiry = async (id) => {
  const response = await API.delete(`/enquiries/${id}`);
  return response.data;
};
