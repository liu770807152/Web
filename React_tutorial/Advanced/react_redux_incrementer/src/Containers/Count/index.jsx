// import UI component
import CountUI from '../../Components/Count';
// import connect to connect UI and redux
import { connect } from 'react-redux';

// create and export a container for Count
export default connect()(CountUI);
