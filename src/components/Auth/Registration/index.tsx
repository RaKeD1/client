import React, {FC, useState} from 'react';

const RegistrationForm:FC = () => {

    const [email, setEmail]=useState<string>('');
    const [password, setPassword]=useState<string>('');
    return (
        <>
            <input
                onChange={e=>setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder="Email"
            />
            <input
                onChange={e=>setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder="Пароль"
            />
            <input
                onChange={e=>setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder="Пароль"/>
            <button>Регистрация</button>
        </>
    );
};

export default RegistrationForm;