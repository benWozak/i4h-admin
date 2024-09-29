import React from "react";
import { useField } from "payload/components/forms";

const ColorPickerInput: React.FC<{
  path: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ path, value, onChange }) => {
  return (
    <div>
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

export const ColorPicker: React.FC<{
  path: string;
  label: string;
  required?: boolean;
}> = ({ path, label, required }) => {
  const { value, setValue } = useField<string>({ path });

  return (
    <div>
      <label htmlFor={path}>{label}</label>
      <ColorPickerInput path={path} value={value} onChange={setValue} />
      {required && <span>*</span>}
    </div>
  );
};

export default ColorPicker;
