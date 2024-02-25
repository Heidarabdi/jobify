import {FormRow, Logo, SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {Form, redirect, Link} from 'react-router-dom';
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/register', data);
        toast.success('Registered successfully')
        return redirect('/login');

    }catch (error){
        return toast.error(error?.response?.data?.msg);

    }
}
const Register = () => {

    return (
        <Wrapper>
            <Form method="post" className='form'>
                <Logo />
                <h4>Register</h4>
                <FormRow type='text' name='name' />
                <FormRow type='text' name='lastName' labelText='last name' />
                <FormRow type='text' name='location' />
                <FormRow type='email' name='email'  />

                <FormRow type='password' name='password' />

                <SubmitBtn />
                <p>
                    Already a member?
                    <Link to='/login' className='member-btn'>
                        Login
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Register;