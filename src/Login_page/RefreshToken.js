import { Link, useNavigate } from "react-router-dom"; 

async function RefreshToken(onNavigate) { // добавлен onNavigate
   const refreshToken = localStorage.getItem('refreshToken');
   if (!refreshToken) return null;

   try {
     const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ refresh: refreshToken })
     });
     if (!response.ok) throw new Error();

     const data = await response.json();
     localStorage.setItem('accessToken', data.access);
     if (data.refresh) {
       localStorage.setItem('refreshToken', data.refresh);
     }
     return data.access;
   } catch {
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refreshToken');
     if (onNavigate) onNavigate("/"); // безопасный вызов функции
   }
}

export default RefreshToken;