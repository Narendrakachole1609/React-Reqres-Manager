import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import UsersList from './component/UsersList';
import EditUser from './component/EditUser';

const App = () => {
  return (
    <Router>
       <Routes>
        
        <Route exact path="/" element={<Login/>} component={Login} />
        <Route exact path="/users/:page" element={<UsersList/>} component={UsersList} />
        <Route exact path="/edit/:id" element={<EditUser/>} component={EditUser} />
       </Routes>    
    </Router>
  );
};

export default App;
