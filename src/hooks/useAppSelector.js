
import { useSelector } from "react-redux";

export const useAppSelector = (selector) => {
  return useSelector(selector);
};

export default useAppSelector;
