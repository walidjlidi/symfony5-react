import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import ProtectedRoute from 'components/Layout/ProtectedRoute';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import Logout from 'components/Logout';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <ProtectedRoute exact path="/" component={DashboardPage} />
                <ProtectedRoute
                  exact
                  path="/login-modal"
                  component={AuthModalPage}
                />
                <ProtectedRoute exact path="/buttons" component={ButtonPage} />
                <ProtectedRoute exact path="/cards" component={CardPage} />
                <ProtectedRoute exact path="/widgets" component={WidgetPage} />
                <ProtectedRoute
                  exact
                  path="/typography"
                  component={TypographyPage}
                />
                <ProtectedRoute exact path="/alerts" component={AlertPage} />
                <ProtectedRoute exact path="/tables" component={TablePage} />
                <ProtectedRoute exact path="/badges" component={BadgePage} />
                <ProtectedRoute
                  exact
                  path="/button-groups"
                  component={ButtonGroupPage}
                />
                <ProtectedRoute
                  exact
                  path="/dropdowns"
                  component={DropdownPage}
                />
                <ProtectedRoute
                  exact
                  path="/progress"
                  component={ProgressPage}
                />
                <ProtectedRoute exact path="/modals" component={ModalPage} />
                <ProtectedRoute exact path="/forms" component={FormPage} />
                <ProtectedRoute
                  exact
                  path="/input-groups"
                  component={InputGroupPage}
                />
                <ProtectedRoute exact path="/charts" component={ChartPage} />
                <ProtectedRoute exact path="/logout" component={Logout} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
