import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type QuantityMeterProps = {
  qunatity: number;
  incQtyFunction: () => void;
  decQtyFunction: () => void;
};

const QuantityMeter = ({
  decQtyFunction,
  incQtyFunction,
  qunatity,
}: QuantityMeterProps) => {
  return (
    <div className="flex gap-x-2 gap-y-2 flex-wrap items-center">
      <span className="text-sm font-semibold text-gray-600">Qunatity :</span>
      <div className="flex items-center border-2 px-2 py-0.5 w-24">
        <AiOutlineMinus
          className="w-full cursor-pointer"
          onClick={decQtyFunction}
        />
        <div className="w-full text-center tabular-nums font-semibold">
          {qunatity}
        </div>
        <AiOutlinePlus
          className="w-full cursor-pointer hover:scale-105 "
          onClick={incQtyFunction}
        />
      </div>
    </div>
  );
};

export default QuantityMeter;
