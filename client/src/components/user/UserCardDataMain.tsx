import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Row, Col, Container, Image, Form } from 'react-bootstrap';
import { Checkbox } from 'primereact/checkbox';

const UserElement = (user: any, handleSubmit: any, onSubmit: any, onImageChange: any, allowPasswordChange: any, changePasswordSelected: any, setChangePasswordSelected: any, passwordValue : any,
    setPasswordValue: any, errors: any, currentUserPicture: any, editUserRoute: any) => {
    
        return (
            <>
                <Container >
                    
                    <Row className="mt-3">

                        <Row>

                            <Col sm={2} className="border rounded">
                                <Image id="user-picture" fluid src={user.picture} alt="pic" />
                            </Col>

                            <Col sm={3} className="ml-3">

                                <Row>
                                    <h3>{user.firstName ? user.firstName : null} {user.lastName ? user.lastName : null}</h3>
                                </Row>

                                <Row>
                                    <h5>role: {user.role}</h5>
                                </Row>

                                <Row>
                                    <h5>email: {user.email}</h5>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-3">

                            <Col sm={12}>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <Row>
                                        <Col sm={5}>
                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Label>Please select picture file</Form.Label>
                                                <Form.Control type="file" name="avatar" accept="image/png, image/jpeg" onChange={(e: React.ChangeEvent) => {
                                                    const targetEl = e.target as HTMLInputElement;
                                                    const file: any = targetEl.files![0];
                                                    onImageChange(file);
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row id="password-checkbox" className="mt-3 justify-content-md-center">
                                        {allowPasswordChange ?
                                            <Col>
                                                <div className="p-inputgroup">
                                                    <div className="field-checkbox">
                                                        <Checkbox inputId="passwordChecker" checked={changePasswordSelected} onChange={e => setChangePasswordSelected(e.checked)} />
                                                    </div>
                                                    <div className="field-checkbox-label">
                                                        <label htmlFor="passwordChecker">{changePasswordSelected ? 'Change password selected' : 'Change password?'}</label>

                                                    </div>
                                                </div>
                                            </Col>
                                            : null}
                                    </Row>

                                    {changePasswordSelected ?
                                        <Row id="password-input-field" className="mt-3" >
                                            <Col sm={5}>
                                                <div className="p-inputgroup">
                                                    <span className="p-inputgroup-addon">
                                                        <i className="pi pi-shield"></i>
                                                    </span>
                                                    <Password defaultValue={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} toggleMask />
                                                </div>
                                                {errors.password && <span className="error-message" role="alert">{errors.password.message}</span>}
                                            </Col>
                                        </Row>
                                        : ''}

                                    <Row className="mt-3 mb-3 justify-content-md-center">
                                        <Col>
                                            {changePasswordSelected || currentUserPicture.length > 0 ?
                                                <Button id="submit-changes-button" label={changePasswordSelected && currentUserPicture.length > 0 ? "Submit changes" : changePasswordSelected ? "Change password" : "Change picture"}
                                                    className="p-button-primary" disabled={false} /> : null}
                                        </Col>
                                    </Row>
                                </form >

                                <Row className="mt-3 mb-3 justify-content-md-center">
                                    <Col>
                                        {user.role === 'admin' ? <Button label="Back to users" className="p-button-primary" disabled={false} onClick={editUserRoute} /> : null}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </>
        )
}

export default UserElement;
