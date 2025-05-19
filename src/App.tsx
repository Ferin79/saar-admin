import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { ChapterList } from "./pages/chapters/ChapterList";
import { UserCreate } from "./pages/users/UserCreate";
import { UserEdit } from "./pages/users/UserEdit";
import { UserList } from "./pages/users/UserList";
import { ChapterEdit } from "./pages/chapters/ChapterEdit";

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
      create={UserCreate}
      edit={UserEdit}
    />
    <Resource name="chapters" list={ChapterList} edit={ChapterEdit} />
  </Admin>
);
