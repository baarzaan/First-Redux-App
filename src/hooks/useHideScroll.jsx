import { useEffect } from "react";

export const useHideScroll = (modal) => {
  useEffect(() => {
    if (modal) {
      console.log("modal-active class added");
    } else {
      document.body.classList.remove("modal-active");
    }

    return () => {
      document.body.classList.remove("modal-active");
    };
  }, [modal]);
};
