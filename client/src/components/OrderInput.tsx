type orderInputProps = {
  type: string;
  name: string;
  placeholder: string;
  onchange: () => void;
  error: string[] | undefined;
};

const OrderInput = ({
  type,
  name,
  onchange,
  placeholder,
  error,
}: orderInputProps) => {
  return (
    <div className="my-2">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onchange}
        className={`border w-full h-9 outline-none bg-white text-black focus-within:border focus-within:border-orange-400 focus-within:bg-orange-400 focus-within:shadow-inner px-2 mb-0.5 dark:bg-slate-600 dark:text-white defNone`}
      />
      {error && (
        <div className="text-xs bg-[#ff0000] text-white px-1 py-1">{error}</div>
      )}
    </div>
  );
};

export default OrderInput;
