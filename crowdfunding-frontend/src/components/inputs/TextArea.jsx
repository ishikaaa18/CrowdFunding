const TextArea = ({ label, value, onChange, placeholder, required }) => (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
  
  export default TextArea;
  