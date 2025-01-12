import { useSelector, useDispatch } from "react-redux";
import { updateSettings } from "../features/sidebar/slices/settingsSlice";

export const useSettings = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const updateSetting = (key, value) => {
    dispatch(updateSettings({ [key]: value }));
  };

  return { settings, updateSetting };
};
