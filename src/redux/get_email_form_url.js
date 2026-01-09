import { useLocation } from 'react-router-dom';

export const useCustomerId = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");
  return customerId;
};
