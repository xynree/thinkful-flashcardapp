/**
 * For all forms - sets up adjustable inputs that updates state of parent component on input change.
 */
const FormPage = ({form, input}) => {
  const [newInput, setNewInput] = input;
  const {title='Title', text1='', text1type='textarea', text2='', btn1='Cancel', btn2='Submit', cancel=() => {}, submit=()=>{} } = form;

  const textChange = (e) => {
    setNewInput({...newInput, [e.target.name.toLowerCase()]: e.target.value})
    console.log(newInput)
  }

  return (
    <form onSubmit={submit}>
      <div className='form-group d-flex flex-column'>
        <label name='title m-2'><h2>{title}</h2></label>
        <label name='text1'>{text1}</label>
        {text1type === 'input'?         
        <input className='form-control mb-4' name={text1} value={newInput[`${text1.toLowerCase()}`]} onChange={textChange}></input>:
        <textarea className='form-control mb-4' name={text1} value={newInput[`${text1.toLowerCase()}`]} onChange={textChange}></textarea>}
        <label name='text2'>{text2}</label>
        <textarea className='form-control mb-2' name={text2} value={newInput[`${text2.toLowerCase()}`]} onChange={textChange}></textarea>
        <div className='d-flex justify-content-start'>
          <button className={`btn btn-secondary mr-2`} onClick={cancel}>{btn1}</button>        
          <button className={`btn btn-primary`} type='submit' >{btn2}</button>
        </div>
      </div>
    </form>
  );
}

export default FormPage;