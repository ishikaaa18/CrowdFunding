const SelectInput = ({ label, value, onChange, options }) => (
    <div className="form-group">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
  
  export default SelectInput;
  