import './Spinner.css';
import {FaSpinner} from 'react-icons/fa';

const Spinner = () => {
    return(
        <div className='spinner'>
            <FaSpinner className='spinning' size={60}/>
        </div>
    )
}

export default Spinner
