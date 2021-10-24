import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home";
import Bars from "./components/Bars";
import Hotels from "./components/Hotels";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Footer from "./components/Footer";
import RestaurantDetails from "./components/RestaurantDetails";
import FoodDetails from "./components/FoodDetails";
import RestaurantSearch from "./components/RestaurantSearch";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { AuthContext } from "./context/AuthContextProvider";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ed5a6b",
    },
    secondary: {
      main: "#e91e63",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/bars" component={Bars} />
            <Route path="/hotels" component={Hotels} />
            <Route path="/restaurant-search" component={RestaurantSearch} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword/:id" component={ResetPassword} />
            <Route
              path="/restaurant/:id"
              render={() => (!isAuth ? <Redirect to="/login" /> : <RestaurantDetails />)}
            />
            <Route path="/food/:id" component={FoodDetails} />
            <Route path="/profile" component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
