import {Logo, FormRow, SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

import {Form, Link, redirect, useNavigate} from 'react-router-dom';
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";


// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/login', data);
        toast.success('Registered successfully')
        return redirect('/dashboard');

    }catch (error){
        return toast.error(error?.response?.data?.msg);

    }
}


const Login = () => {
    const navigate = useNavigate();
    const loginDemoUser = async () => {
        const data = {
            email: 'test@test.com',
            password: 'secret123',
        };
        try {
            await customFetch.post('/auth/login', data);
            toast.success('take a test drive');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h4>login</h4>
                <FormRow type='email' name='email' defaultValue='Heidar@gmail.com' />
                <FormRow type='password' name='password' defaultValue='12345678' />
                <SubmitBtn />
                <button type='button' className='btn btn-block' onClick={loginDemoUser}>
                    explore the app
                </button>
                <p>
                    Not a member yet?
                    <Link to='/register' className='member-btn'>
                        Register
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};
export default Login;