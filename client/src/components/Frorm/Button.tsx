type ButtonProps = {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  classes: string;
  disabled?: boolean;
  onclick?: () => void;
};

const Button = ({
  type,
  text,
  classes,
  disabled,
  onclick,
}: ButtonProps): JSX.Element => {
  return (
    <button
      type={type}
      className={`px-2 py-0.5 ${classes}`}
      disabled={disabled}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
