import { Link } from 'react-router-dom'

/** 
 * For buttons to navigate to route Links or execute some action on click.
 * 
 * @param button
 * data to set up link path, styling, icon using OI library
 * @param action
 * optional action to run on the button onClick if Link is not being used
 * 
 * @returns {<Link<S>>}
 * Link element wrapping a button element
 */
const HelperButton = ({button, action=() => {}}) => {
  const { icon='', text='',link='', style='primary', extra='' } = button;
  
  return (
    <Link to={`${link}`} className={extra}><button className={`btn btn-${style} m-2`} onClick={action}> <span className={`oi oi-${icon}`}/> {text} </button></Link>
  );
}

export default HelperButton;