import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import TeacherForm from "./pages/TeacherForm/TeacherForm";
import Teacherlist from "./pages/TeacherList/TeacherList";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Landing} exact />
      <Route path="/study" component={Teacherlist} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
};

export default Routes;
