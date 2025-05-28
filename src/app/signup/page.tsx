'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        console.log('Signup request:', { email, password });
        const res = await fetch('/api/signup', {
        method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            router.push('/login');
        } else {
            setError('登録に失敗しました');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
            <h2 className="text-xl mb-4">サインアップ</h2>
            <input
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="block w-full mb-2 p-2 border"
                required
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full mb-2 p-2 border"
                required
            />
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">登録</button>
        </form>
    )
}
