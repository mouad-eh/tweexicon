import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { JWT_COOKIE, SIGNIN_PATH } from '../utils/constants'

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
// export default function AuthProtected(props) {
//     const navigate = useNavigate();

//     const checkUserToken = () => {
//         const userToken = Cookies.get(JWT_COOKIE);
//         if (!userToken || userToken === 'undefined') {
//             return navigate(SIGNIN_PATH);
//         }
//     }

//     useEffect(() => {
//         checkUserToken();
//     }, []);

//     return (
//         <React.Fragment>
//             {
//                 Cookies.get(JWT_COOKIE) ? props.children : null
//             }
//         </React.Fragment>
//     );
// }

