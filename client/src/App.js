import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DiningOut from "./components/DiningOut";
import Nightlife from "./components/Nightlife";
import Nutrition from "./components/Nutrition";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Footer from "./components/Footer";
import RestaurantDetails from "./components/RestaurantDetails";
import FoodDetails from "./components/FoodDetails";

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

// rPF8LXa4WNvtdNO7k2jtwKY17VsyIsEQQUWHZiN-R93JR2bQ8LMdzAR_cLMijcUE91WEuq17OciXUWSodtHTdqJ_7f6PuDEbEEdgXV_B6KZb65vYBZD56VWTZBPLYHYx

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/dine-out" component={DiningOut} />
            <Route path="/nightlife" component={Nightlife} />
            <Route path="/nutrition" component={Nutrition} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword/:id" component={ResetPassword} />
            <Route path="/restaurant/:id" component={RestaurantDetails} />
            <Route path="/food/:id" component={FoodDetails} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
