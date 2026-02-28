import { useEffect, useState } from 'react';
import useUserStore from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const { user, signIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) navigate('/seller-dashboard');
  }, [user.isLoggedIn, navigate]);

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn({ name: 'User', email, role: 'seller' });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#00A86B]">Sign In</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#00A86B] text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;