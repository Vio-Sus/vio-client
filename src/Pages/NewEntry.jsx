import Form from "../components/Entry/AddEntryForm";



const NewEntryPage = ({ sources, items }) => {
  return (
    <>
      <h1>Input New Entry</h1>
      <Form sources={sources} items={items}></Form>
    </>
  );
};

export default NewEntryPage;
