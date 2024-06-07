import { useState } from "react";

type MultiRangeProps = {
  label: string;
  min: number;
  max: number;
  defaultValueMin: number;
  defaultValueMax: number;
};

const MultiRange = ({
  label,
  min,
  max,
  defaultValueMin,
  defaultValueMax,
}: MultiRangeProps) => {
  const [minVal, setMinVal] = useState(defaultValueMin || min);
  const [maxVal, setMaxVal] = useState(defaultValueMax || max);

  return (
    <div className="flex justify-center">
      <label className="cursor-pointer min-w-32">
        <span className="label-text capitalize">{label}</span>
        {/* <span className="tabular-nums">&#8377;{selectedPrice}</span> */}
      </label>
      <div className="flex items-center relative w-[150px] gap-x-3">
        <input
          type="number"
          name="min"
          min={min}
          max={maxVal - 1}
          value={minVal}
          onChange={(e) => setMinVal(Number(e.target.value))}
          className="w-14 h-5 defNone text-sm border border-black text-center"
        />
        <p className="font-bold">-</p>
        <input
          type="number"
          name="max"
          min={minVal}
          max={max}
          value={maxVal}
          onChange={(e) => setMaxVal(Number(e.target.value))}
          className={
            "w-14 h-5 defNone text-sm border border-black  text-center"
          }
        />
      </div>
    </div>
  );
};
export default MultiRange;
