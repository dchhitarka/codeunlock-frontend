import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

// export const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
//   const user = useContext(UserContext).userState;
//   return (
//     <Route {...rest} render={(props) => (
//       (user?.isAdmin === 1)
//         ?
//         <Component {...props} />
//         : <Redirect to={{
//             pathname: '/login',
//             state: { from: props.location }
//           }} />
//     )} />
//   )
// }

// export const AuthRoute = ({ component: Component, ...rest }) => {
//   const user = useContext(UserContext).userState;
//   return (
//     <Route {...rest} render={(props) => (
//       (user.isAuthenticated === false || user.isAuthenticated === undefined)
//         ?
//         <Component {...props} />
//         : <Redirect to={{
//             pathname: '/',
//           }} />
//     )} />
//   )
// }

// export const LoggedRoute = ({ children: Component, ...rest }) => {
//   const user = useContext(UserContext).userState;
//   // user.isAuthenticated ? <Route children={children}/>
//   // return (
//   //   <Route {...rest} render={(props) => (
//   //      === true
//   //       ?
//   //       <Component {...props} />
//   //       : <Redirect to={{
//   //           pathname: '/',
//   //         }} />
//   //   )} />
//   // )
//   return '';
// }

export const RequiredAuth = ({ children, redirectTo }) => {
  const {user} = useUserContext();
  return user.isAuthenticated ? children : <Navigate to={redirectTo} />;
}
