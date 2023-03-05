import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function AuthProtected(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const cookies = new Cookies();
        const userToken = cookies.get("jwt-authorization");
        // console.log(userToken);
        // is printed 3 times don't know why
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
