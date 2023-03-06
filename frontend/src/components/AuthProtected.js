import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AuthProtected(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = Cookies.get("jwt-authorization");
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/signin');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
