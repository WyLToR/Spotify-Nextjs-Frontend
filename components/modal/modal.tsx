import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";

export default function Modal(props: any) {
    if (props.log) {
        return props.log.loginModal ? (
            <LoginModal
                loginModal={props.log.loginModal}
                setLoginModal={props.log.setLoginModal}
                registerModal={props.reg.registerModal}
                setRegisterModal={props.reg.setRegisterModal}
            />
        ) : (
            <RegisterModal
                loginModal={props.log.loginModal}
                setLoginModal={props.log.setLoginModal}
                registerModal={props.reg.registerModal}
                setRegisterModal={props.reg.setRegisterModal}
            />
        );
    }
}
