import { connect } from 'react-redux';
import { MainPage } from './MainPage';


function mapStateToProps(state){
  return {
    user: state.user,
  }
}



export default connect(mapStateToProps, null)(MainPage)