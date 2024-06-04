import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Single = props => {
    const [hasAccess, setHasAccess] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        fetch(`https://sturdy-umbrella-57ww7q5497v27rqq-3001.app.github.dev/api/private`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setHasAccess(true);
            })
            .catch(error => {
                console.error('Error:', error);
                setHasAccess(false);
            });
    }, []);

    return (
        <div className="jumbotron">
            {hasAccess === null ? (
                <p>Loading...</p>
            ) : hasAccess ? (
                <p>You have access to this page.</p>
            ) : (
                <p>You do not have access to this page.</p>
            )}
            <Link to="/">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};