import { useMediaQuery } from "usehooks-ts";

export const useResponsive = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile;
};
