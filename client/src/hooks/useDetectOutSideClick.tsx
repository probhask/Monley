import React, { useEffect, useRef } from "react";

/* detect click outside the box */
const useDetectOutSideClick = (
  callback: () => void
): React.RefObject<HTMLDivElement> => {
  const outsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkClick = (e: MouseEvent | TouchEvent) => {
      if (
        outsideRef.current &&
        !outsideRef.current.contains(e.target as Node)
      ) {
        callback();
      }
    };

    window.addEventListener("mouseup", checkClick, true);
    window.addEventListener("touchend", checkClick, true);

    return () => {
      window.removeEventListener("click", checkClick, true);
      window.removeEventListener("touchend", checkClick, true);
    };
  }, [callback]);

  return outsideRef;
};

export default useDetectOutSideClick;
