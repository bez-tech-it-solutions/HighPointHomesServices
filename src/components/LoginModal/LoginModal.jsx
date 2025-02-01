/* eslint-disable react/prop-types */
import { useState } from 'react'
import ManualLogin from '../ManualLogin/ManualLogin'
import ManualRegister from '../ManualLogin/ManualRegister'

const LoginModal = ({ setProfile }) => {
    const [formState, setFormState] = useState(true);

    return (
        <div className="modal fade" id="modalId"
            tabIndex={"-1"}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalTitleId">{formState ? "Login" : "Register"}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {formState ? (
                            <ManualLogin setProfile={setProfile} state={setFormState} redirect="/" />
                        ) : (
                            <ManualRegister setProfile={setProfile} state={setFormState} redirect="/" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal