import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setLogin } from "../../store/actions/login";

const LocalStorageCheck = ({ children, setLogin }) => {
    const user = {
        email: localStorage.getItem('email'),
        apelido: localStorage.getItem('apelido'),
        saldoDeMonitoria: Number(localStorage.getItem('saldo')),
        role: localStorage.getItem('role')
    }

    setLogin(user)

    return children;
}

const mapDispatchToProps = dispatch => bindActionCreators({ setLogin }, dispatch)

export default connect(null, mapDispatchToProps)(LocalStorageCheck)