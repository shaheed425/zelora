import API from './api';

export const startMigration = async (options = {}) => {
  const response = await API.post('/migration/start', options);
  return response.data;
};

export const fetchMigrationStatus = async () => {
  const response = await API.get('/migration/status');
  return response.data;
};

export const fetchMigrationLogs = async () => {
  const response = await API.get('/migration/logs');
  return response.data;
};

export const retryMigration = async () => {
  const response = await API.post('/migration/retry');
  return response.data;
};
