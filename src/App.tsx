import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { ChapterEdit } from "./pages/chapters/ChapterEdit";
import { ChapterList } from "./pages/chapters/ChapterList";
import { LanguageList } from "./pages/languages/LanguageList";
import { UserCreate } from "./pages/users/UserCreate";
import { UserEdit } from "./pages/users/UserEdit";
import { UserList } from "./pages/users/UserList";
import { LanguageEdit } from "./pages/languages/LanguageEdit";
import { LanguageCreate } from "./pages/languages/LanguageCreate";

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
    <Resource
      name="languages"
      list={LanguageList}
      edit={LanguageEdit}
      create={LanguageCreate}
    />
    <Resource name="chapters" list={ChapterList} edit={ChapterEdit} />
  </Admin>
);
