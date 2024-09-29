import React from "react";
import { useField, TextInput } from "payload/components/forms";

const ColorPickerInput: React.FC<{
  path: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ path, value, onChange }) => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <input
        style={{
          background: "none",
          border: "none",
          width: 40,
          height: 40,
          borderRadius: "40rem",
        }}
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
      />
      <TextInput
        name="color"
        path={path}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
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
