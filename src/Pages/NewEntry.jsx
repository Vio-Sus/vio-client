import Form from "../components/Form";
const NewEntryPage = ({ sources, items }) => {
  return (
    <>
      <h1>Input New Entry</h1>
      <Form sources={sources} items={items}></Form>
    </>
  );
};

export default NewEntryPage;
