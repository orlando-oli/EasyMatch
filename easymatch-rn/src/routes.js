import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Login from './screens/LoginScreen';
import CreatUser from './screens/CreatUserScreen';
import Main from './screens/MainScreen';
import Feed from './screens/FeedScreen';
import Setup from './screens/SetupWizardScreen';
import UserPage from './screens/UserPage';
import CreateEventScreen from './screens/CreateEventScreen';
import FeedBySport from './screens/FeedBySportScreen';
import drawerContentComponents from './Components/drawerContentComponents'
import UpdateInfo from './screens/UpdateInfoScreen'
import MyEventsScreen from './screens/MyEventsScreen';

const Drawer = createDrawerNavigator({
  Main,
  UserPage,
  CreateEventScreen,
  FeedBySport,
  Feed,
  UpdateInfo,
  MyEventsScreen,
},
{
  contentComponent: drawerContentComponents
})

const Routes = createAppContainer(
    createSwitchNavigator({
      Login,
      CreatUser,
      Setup,
      Drawer,
    }),
);

export default Routes;
