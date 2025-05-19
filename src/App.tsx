import { Admin, Resource, ShowGuesser } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { ChapterList } from "./pages/chapters/ChapterList";
import { UserList } from "./pages/users/UserList";
import { UserShow } from "./pages/users/UserShow";
import { UserCreate } from "./pages/users/UserCreate";
import { UserEdit } from "./pages/users/UserEdit";

export const App = () => (
  <Admin
    layout={Layout}
    authProvider={authProvider}
    requireAuth
    dataProvider={dataProvider}
  >
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      create={UserCreate}
      edit={UserEdit}
    />
    <Resource name="chapters" list={ChapterList} show={ShowGuesser} />
  </Admin>
);
