type FormSelectProps = {
  label: string;
  name: string;
  list: string[];
  defaultValue: string;
};
const FormSelelct = ({ label, list, name, defaultValue }: FormSelectProps) => {
  return (
    <div className="flex">
      <label htmlFor={name} className="w-full">
        <span className="capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`w-full h-7 cursor-pointer`}
        defaultValue={defaultValue}
      >
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelelct;
