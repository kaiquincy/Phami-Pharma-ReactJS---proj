import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

const useMongoAuth = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra đăng nhập khi ứng dụng khởi động, ví dụ bằng cách gọi API với token lưu trong localStorage
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/user/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          setUser(null);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    checkLoggedIn();
  }, []);

  // Đăng ký người dùng
  const signUpUser = async (email, password, name, image) => {
    setIsLoading(true);
    try {
      const username = name;
      const res = await axios.post('http://localhost:5000/api/user/register', { email, password, username, image });
      // Giả sử API trả về { token, user }
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      swal("Good job!", "Account has been created!", "success");
      history.push('/');
      window.scrollTo(0, 100);
    } catch (err) {
      swal("Something went wrong!", err.response?.data?.message || err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng nhập người dùng
  const signInUser = async (email, password) => {
    setIsLoading(true);
    try {
      const username = email
      const res = await axios.post('http://localhost:5000/api/user/login', { username, password });
      // Giả sử API trả về { token, user }
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      swal("Sign in Successful!", "Welcome back!", "info");
      history.push('/');
      window.scrollTo(0, 100);
    } catch (err) {
      swal("Something went wrong!", err.response?.data?.message || err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng nhập với Google
  const signInWithGoogle = async () => {
    // Nếu bạn đã tích hợp OAuth cho Google trên backend, bạn có thể chuyển hướng người dùng tới endpoint này
    window.location.href = '/api/auth/google';
  };

  // Đăng xuất người dùng
  const signOutUser = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem('token');
      setUser(null);
      swal("Logout Successful!", "You are logged out!", "success");
      history.push('/signin');
    } catch (err) {
      swal("Something went wrong!", err.response?.data?.message || err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    signInUser,
    signUpUser,
    signOutUser,
    signInWithGoogle,
    isLoading,
  };
};

export default useMongoAuth;
