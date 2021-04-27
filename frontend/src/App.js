import { useEffect } from "react";
import { BrowserRouter, HashRouter, NavLink, Route } from "react-router-dom";
import "./1-css/App.css";
import AuthPage from "./components/connexion/AuthPage";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Contact from "./components/home/ContactContainer";
import HomeDeclaration from "./components/home/HomeDeclaration";
import MentionsLegales from "./components/home/MentionsLegalesContainer";
import ConfirmEmail from "./components/password-forget/ConfirmEmail";
import UpdatePassword from "./components/password-forget/UpdatePassword";
/* test */
function App() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <HashRouter hashType="slash">
      <div className="App">
        <Route path="/" exact component={HomeDeclaration} />
        <Route
          path="/saisir-ma-declaration/:userid"
          component={HomeDeclaration}
        />
        <Route path="/formulaire-de-contact" component={Contact} />
        <Route path="/mon-espace" component={Dashboard} />
        <Route path="/mentions-legales" component={MentionsLegales} />
        <Route path="/connexion" exact component={AuthPage} />
        <Route path="/update-password/:id" component={UpdatePassword} />
        <Route path="/forget-password" component={ConfirmEmail} />
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
