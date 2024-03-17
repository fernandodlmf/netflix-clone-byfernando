import { useCallback, useState } from "react";
import Input from "@/components/Input";
import axios from 'axios'
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const [variant, setVariant] = useState('login');
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/',
            })

            alert('login funcionou')
            //router.push('/')
        } catch (error) {
            console.log("errouuu")
            console.log(error)
        }

    },[email, password, router]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                username,
                password
            })

            login();
        } catch(error) {
            console.log(error)
        }

    },[email, username, password, login])


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-center bg-cover">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"></img>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 mt-2 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h1 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sing in' : 'Create an account'}
                        </h1>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' && (
                                <Input 
                                label="Username"
                                onChange={(ev: any) => setUsername(ev.target.value)}
                                id="username"
                                type="string"
                                value={username} />
                            )}
                            
                            <Input 
                                label="Email"
                                onChange={(ev: any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email} />
                            <Input 
                                label="Password"
                                onChange={(ev: any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password} />
                        </div>
                        <button onClick={variant == 'login' ? login: register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant == 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <p className="text-neutral-500 text mt-12">
                            {variant == 'login' ?  'First time using Netflix?' : 'Already have an account'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant == 'login' ?  'Create an account' : 'Come back to login?'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default auth;