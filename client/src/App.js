import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

// Boards
import BoardEmployer from "./components/BoardEmployer";

// CRUD
import GetJob from "./components/CRUD/GetJob";
import CreateJob from "./components/CRUD/CreateJob";
import UpdateJob from "./components/CRUD/UpdateJob";
import DeleteJob from "./components/CRUD/DeleteJob";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  // CRUD
  const [showGetJob, setShowGetJob] = useState(true);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showUpdateJob, setShowUpdateJob] = useState(false);
  const [showDeleteJob, setShowDeleteJob] = useState(false);

  // Boards
  const [showBoardEmployer, setShowBoardEmployer] = useState(false);
  
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      // CRUD
      setShowGetJob(currentUser.roles.includes("ROLE_EMPLOYER") || currentUser.roles.includes("ROLE_EMPLOYEE") || currentUser.roles.includes("ROLE_ADMIN"));
      setShowCreateJob(currentUser.roles.includes("ROLE_EMPLOYER"));
      setShowUpdateJob(currentUser.roles.includes("ROLE_EMPLOYER") || currentUser.roles.includes("ROLE_ADMIN"));
      setShowDeleteJob(currentUser.roles.includes("ROLE_ADMIN"));

      // Boards
      setShowBoardEmployer(currentUser.roles.includes("ROLE_EMPLOYER"));
    } else {
      // CRUD
      setShowGetJob(false);
      setShowCreateJob(false);
      setShowUpdateJob(false);
      setShowDeleteJob(false);

      // Boards
      setShowBoardEmployer(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            HungLeeTest2
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {/* {showBoardEmployer && (
              <li className="nav-item">
                <Link to={"/employer"} className="nav-link">
                  Employer Board
                </Link>
              </li>
            )} */}

            {showGetJob && (
              <li className="nav-item">
                <Link to={"/get"} className="nav-link">
                  View Jobs
                </Link>
              </li>
            )}

            {showCreateJob && (
              <li className="nav-item">
                <Link to={"/create"} className="nav-link">
                  Post Jobs
                </Link>
              </li>
            )}

            {showUpdateJob && (
              <li className="nav-item">
                <Link to={"/update"} className="nav-link">
                  Update Jobs
                </Link>
              </li>
            )}

            {showDeleteJob && (
              <li className="nav-item">
                <Link to={"/delete"} className="nav-link">
                  Delete Jobs
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />

            {/* CRUD */}
            <Route path="/get" component={GetJob} />
            <Route path="/create" component={CreateJob} />
            <Route path="/update" component={UpdateJob} />
            <Route path="/delete" component={DeleteJob} />

            {/* BOARDS */}
            <Route path="/employer" component={BoardEmployer} />
          </Switch>
        </div>

        <AuthVerify logOut={logOut}/>
      </div>
    </Router>
  );
};

export default App;
