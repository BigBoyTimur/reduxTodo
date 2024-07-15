function InputField({ text, handleInput, handleSubmit }) {
  return (
    <label>
      <input value={text} onChange={(e) => handleInput(e.target.value)} type="text"/>
      <button onClick={handleSubmit}>Add Todo</button>
    </label>
  );
}

export default InputField;