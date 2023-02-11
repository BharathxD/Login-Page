import classes from "./Input.module.css";

export const Input: React.FC<{
  isValid: boolean | undefined;
  type: string;
  id: string;
  value?: string;
  onChange: (e: React.FormEvent) => void;
  onBlur: () => void;
  label: string;
}> = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
