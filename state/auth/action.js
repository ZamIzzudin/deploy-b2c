/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import api from '../../utils/api';
import { handleShowErrorMessage } from '../errorHandle/action';
import socialMediaAuth, { socialMediaLogout } from '../../login-auth/auth';

const ActionType = {
    LOGIN: 'LOGIN',
    CHECK_AUTH: 'CHECK_AUTH',
    REGISTER: 'REGISTER',
    LOGOUT: 'LOGOUT',
};

// Action
function LoginAction(user) {
    return {
        type: ActionType.LOGIN,
        payload: {
            user: { emailVerified: true },
            token: user.token,
            role: user.role,
        },
    };
}

function CheckAuthAction(data) {
    return {
        type: ActionType.CHECK_AUTH,
        payload: {
            user: { emailVerified: true },
            token: data.token,
            role: data.role,
        },
    };
}

function RegisterAction(user) {
    return {
        type: ActionType.REGISTER,
        payload: {
            user: { emailVerified: true },
            token: user.token,
            role: user.role,
        },
    };
}

function LogoutAction() {
    return {
        type: ActionType.LOGOUT,
        payload: {
            user: { emailVerified: false },
            token: null,
            role: null,
        },
    };
}

// Middleware
function AsyncLogin(data) {
    return async (dispatch) => {
        try {
            const response = await api.Login(data);

            saveDataLogin({ emailVerified: true }, response.token, response.role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            dispatch(LoginAction(response));
        } catch (err) {
            dispatch(handleShowErrorMessage());
        }
    };
}

function AsyncGoogleLogin(provider) {
    return async (dispatch) => {
        try {
            const res = await socialMediaAuth(provider);
            const auth = {
                username: res.displayName,
                email: res.email,
                firebase_id: res.uid,
            };

            const response = await api.GoogleLogin(auth);

            saveDataLogin({ emailVerified: true }, response.token, response.role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            dispatch(LoginAction(response));
        } catch (err) {
            console.log(err);
        }
    };
}

function AsyncRefresh() {
    return async (dispatch) => {
        try {
            const response = await api.Refresh();
            const role = [response?.user.role];

            const dataAuth = {
                token: response.refresh_token,
                role,
            };

            saveDataLogin({ emailVerified: response.status }, response.refresh_token, role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.refresh_token}`;
            dispatch(LoginAction(dataAuth));
        } catch (err) {
            console.log(err);
        }
    };
}

function AsyncCheckLogin() {
    return async (dispatch) => {
        try {
            const dataStore = sessionStorage.getItem('user');
            const data = JSON.parse(dataStore);
            if (data !== null) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${data?.token}`;
                dispatch(CheckAuthAction(data));
            } else {
                dispatch(LogoutAction());
            }
        } catch (err) {
            console.log(err);
        }
    };
}

function AsyncRegister(data) {
    return async (dispatch) => {
        try {
            const response = await api.Register(data);

            saveDataLogin({ emailVerified: true }, response.token, response.role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            dispatch(RegisterAction(response));
        } catch (err) {
            console.log(err);
        }
    };
}

function AsyncLogout() {
    return async (dispatch) => {
        try {
            socialMediaLogout();
            sessionStorage.setItem('user', null);
            delete axios.defaults.headers.common['Authorization'];

            dispatch(LogoutAction());
        } catch (err) {
            console.log(err);
        }
    };
}

// Utils
function saveDataLogin(data, token, role) {
    if (data !== undefined) {
        const dataUser = {
            user: {
                emailVerified: data.emailVerified,
            },
            token,
            role,
        };

        const expiryDate = new Date();
        const month = (expiryDate.getMonth() + 1) % 12;
        expiryDate.setMonth(month);

        sessionStorage.setItem('user', JSON.stringify(dataUser));
    }
}

export {
    ActionType, AsyncLogin, AsyncCheckLogin, AsyncGoogleLogin, AsyncRegister, AsyncLogout, AsyncRefresh,
};
