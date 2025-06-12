import React, {useState} from "react";
import styles from './Login_page.module.css';
import { Link, useNavigate } from "react-router-dom"; 


function Login_page ()
{
   const navigate = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState({email: "", password: "", common: ""});

   const handleLogin = async (e) => {
      e.preventDefault();
      let valid = true;
      let errors = {
         email: "",
         password: "",
         common: ""
      };

      if (!email) {
         errors.email = "Заполните поле";
         valid = false;
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
         errors.email = "Введите корректный e-mail";
         valid = false;
      }
      if (!password) {
         errors.password = "Заполните поле";
         valid = false;
      }

      if (password && (password.length < 8 || !/[a-zA-Z]/.test(password))) {
         errors.password = "Пароль должен быть не менее 8 символов и содержать хотя бы одну букву";
         valid = false;
      }

      setError(errors);
      if (valid) {
         try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({ email, password})
            });
            if (!response.ok) throw new Error('Ошибка авторизации');
            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            navigate("/Catalog");
         } catch {
         setError({ email: "", password: "", common: "Неверный email или пароль" });
         }
      }
  };

  return (
   <div className={styles.DIV}>
      <div className={styles.modal}>
         <p className={styles.pEntrance}>Вход</p>
         <form onSubmit={handleLogin}>
            <div className={styles.InputContainer}>
               <p>E-mail</p>
               <input 
                  value={email}
                  onChange={e => {
                     setEmail(e.target.value);
                     setError(prev => ({ ...prev, email: "", common: ""}));
                  }}
                  style={error.email ? { border: '1px solid #e13939' } : {}}
               />
               {error.email && 
                  <div className={styles.Error}>{error.email}</div>
               }
               <p>Пароль</p>
               <input 
                  type="password"
                  value={password}
                  onChange={e => {
                     setPassword(e.target.value);
                     setError(prev => ({ ...prev, password: "", common: ""}));
                  }}
                  style={error.password ? { border: '1px solid #e13939' } : {}}
               />
               {error.password && (
                  <div className={styles.Error}>{error.password}</div>
               )}
               {error.common && (
                  <div className={styles.Error}>{error.common}</div>
               )}
            </div>
            <button className={styles.ButtonLogin} type="submit">
               Войти
            </button>
         </form>   
      </div>
   </div>
   );
};

export default Login_page;