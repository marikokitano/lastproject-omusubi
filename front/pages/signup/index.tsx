import React, { useState } from "react";
import { NextPage } from "next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import axios from "axios";
import Navbar from "../../components/Layout";
import Link from "next/link";
import Button from '@/components/Button';


type Inputs = {
    name: string;
    family_id: number;
    email: string;
    password: string;
}

const ENDPOINT_URL = "http://localhost:8080/users";

const SignUp: NextPage = () => {
    const [authError, setAuthError] = useState(false);
    const router = useRouter();
    const [inputs, setInputs] = useState<Inputs>({
        name: "",
        family_id: 0,
        email: "",
        password: "",
    });

const [emailSent, setEmailSent] = useState(false); 

    const onSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, inputs.email, inputs.password).then(({user}: any) => {
            const createUser = {
                name: inputs.name,
                email: inputs.email,
                family_id: inputs.family_id,
                uid: user.uid,
            };

            sendEmailVerification(user)
                .then(() => {
                // メールの送信に成功した場合の処理
                setEmailSent(true);
                console.log("Email verification sent");
            })
                .catch((error) => {
                // メールの送信に失敗した場合の処理
            console.error("Failed to send email verification:", error);
            });
            
            try {
                axios.post(ENDPOINT_URL, createUser).then((res) => {
                    const targetId = res.data.id;
                    setCookie(null, "id", targetId, {
                        maxAge: 1 * 1 * 60 * 60,
                        pass: "/",
                    });
                    setCookie(null, "signedIn", "true", {
                        maxAge: 1 * 1 * 60 * 60,
                        path: "/",
                    })
                    router.push("/");
                });
            } catch (error) {
                console.log(error);
            }
        
    });
    
};
const handleClick = () => {
    console.log('ボタンがクリックされました！');
    };
return (
    <Navbar>
        <div className="text-center items-center">
            <h2 className="font-medium py-10">ユーザー登録</h2>
            <form onSubmit={onSignUp}>
                <div className="pb-10">
                    <label htmlFor="name">ニックネーム</label><br></br>
                    <input
                        type="text"
                        name="name"
                        onChange={(e) =>
                            setInputs((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        className='bg-slate-200 w-80 h-7 rounded-lg font-normal'
                    />
                </div>
                <div className="pb-10">
                    <label htmlFor="email">メールアドレス</label><br></br>
                    <input
                        type="text"
                        name="email"
                        onChange={(e) =>
                            setInputs((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        className='bg-slate-200 w-80 h-7 rounded-lg font-normal'
                    />
                </div>
                <div className="pb-10">
                    <label htmlFor="password">パスワード</label><br></br>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) =>
                            setInputs((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        className='bg-slate-200 w-80 h-7 rounded-lg font-normal'
                    />
                </div>
                <div className="button-container inline-block pt-10">
                <Link href="/complete">
                    <div>
                            <Button onClick={handleClick} type="submit" text="ユーザー登録をする"/>
                    </div>
                </Link>
                </div>
            </form>
        </div>

    </Navbar>
    );
};

export default SignUp;