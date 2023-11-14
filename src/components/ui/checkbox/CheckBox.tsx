type CheckBoxComponentProps = {
  labelName: string;
  isChecked?: boolean;
  isLoading?: boolean;
  onChangeMethod?: unknown;
};

export default function CheckBox({
  labelName,
  isChecked,
  isLoading,
  onChangeMethod,
}: CheckBoxComponentProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isLoading}
          onChange={() => onChangeMethod}
          className="checkbox checkbox-primary"
        />
        <text className="text-xl">{labelName}</text>
      </label>
    </div>
  );
}
