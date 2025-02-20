const FileInput = ({ label, onChange }) => (
    <div className="form-group">
      <label>{label}</label>
      <input type="file" accept="image/*" onChange={onChange} />
    </div>
  );
  
  export default FileInput;
  