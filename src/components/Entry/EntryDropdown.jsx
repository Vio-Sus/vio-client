export default function EntryDropdown({ objects, entryFor }) {
  return (
    <>
      <label>Source</label>
      <select name="source_id" onChange={(e) => handleFormValues(e)}>
        <option hidden>Select Source</option>
        {objects.map((source, key) => (
          <option key={key} value={source.source_id}>
            {source.name}
          </option>
        ))}
        <option value="add_source">Add {{ entryFor }}...</option>
      </select>
    </>
  );
}
