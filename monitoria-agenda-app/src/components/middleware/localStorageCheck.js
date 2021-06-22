import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import loginAction from "../../store/actions/login";

const LocalStorageCheck = ({ children, loginAction }) => {
    const user = {
        email: localStorage.getItem('email'),
        apelido: localStorage.getItem('apelido'),
        saldo: localStorage.getItem('saldo'),
        role: localStorage.getItem('role')
    }

    loginAction(user)

    return children;
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginAction }, dispatch)

export default connect(null, mapDispatchToProps)(LocalStorageCheck)