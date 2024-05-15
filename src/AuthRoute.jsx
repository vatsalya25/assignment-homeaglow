import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

function AuthRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  location: PropTypes.object.isRequired,
};

export default AuthRoute;
