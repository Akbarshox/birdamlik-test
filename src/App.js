import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Main from './Containers/LandingPage/Landing'
import Auth from "./Containers/Authentication/Auth";
import User from "./Containers/User/User";
import Groups from './Containers/Group/Groups';
import MakeGroup from './Containers/MakeGroup/MakeGroup';
import Nopage from './Containers/404/404';
import Aux from './hoc/Wrapper';
import BottomAppbar from "./Components/BottomNavbar/BottomNavbar";
import Sponsors from "./Components/OurSponsors/Sponsors";

import {Provider} from "react-redux";
import store from './store/store';

import {createBrowserHistory} from 'history';
import Preloader from "./Components/Preloader/Preloader";
import beta from './assets/beta.svg';

const history = createBrowserHistory();

function App() {
   const matches = useMediaQuery('(max-width:600px)');
   
   return (
       <Provider store={store}>
          <img src={beta} className="beta"/>
          <Preloader/>
          <BrowserRouter basename={'/'}>
             <Switch>
                <Route exact path="/" render={() => <Aux><Redirect to="/ru"/></Aux>}/>
                <Route path="/:lang" render={(props) =>
                    ['ru', 'en', 'uz'].includes(props.match.params.lang) ?
                        <Aux>
                           <Switch>
                              <Route exact path="/:lang" component={Main}/>
                              <Route exact path="/:lang/auth" component={Auth}/>
                              <Route exact path="/:lang/groups" component={Groups}/>
                              <Route exact path="/:lang/newgroup" component={MakeGroup}/>
                              <Route exact path="/:lang/sponsors" component={Sponsors}/>
                              <Route path="/:lang/:user" render={User}/>
                           </Switch>
                           {matches === true ? <Route path={'/:lang/:user/:contenttype'}
                                                      render={(props) => <BottomAppbar {...props}/>}/> : null}
                        </Aux> :
                        <Route exact path="/:lang" component={Nopage}/>
                }/>
             </Switch>
          </BrowserRouter>
       </Provider>
   );
}

export default App;
