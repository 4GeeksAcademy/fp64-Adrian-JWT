import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
	const backend_url = process.env.BACKEND_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
		console.log(backend_url)
        const response = await fetch(`https://sturdy-umbrella-57ww7q5497v27rqq-3001.app.github.dev/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
		localStorage.setItem("jwt-token", data.token);
		alert(data.token);
    };

    return (
        <div className="text-center mt-5">
            <h1>Hello Rigo!!</h1>
            <p>
                <img src={rigoImageUrl} />
            </p>
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <input type="submit" value="Login" />
            </form>
            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your python backend is running)..."}
            </div>
            <p>
                This boilerplate comes with lots of documentation:{" "}
                <a href="https://start.4geeksacademy.com/starters/react-flask">
                    Read documentation
                </a>
            </p>
        </div>
    );
};