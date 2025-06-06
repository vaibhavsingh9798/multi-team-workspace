'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" onChange={handleChange} placeholder="Email" required className="w-full border p-2" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" required className="w-full border p-2" />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Log In</button>
      </form>
    </div>
  );
}
