type ChooseItemProps = {
  item: string;
  selectedItem: string | undefined;
  onClickFunc: () => void;
};

const ChooseItem = ({ item, selectedItem, onClickFunc }: ChooseItemProps) => {
  return (
    <div
      className={`bg-gray-50 text-gray-600 dark:bg-slate-800 dark:text-white px-4 py-1 cursor-pointer box-border rounded-full ${
        selectedItem === item
          ? "border-2 border-orange-400 text-orange-400 dark:text-orange-400"
          : ""
      }`}
      onClick={onClickFunc}
    >
      {item}
    </div>
  );
};

export default ChooseItem;
