import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import { ChapterTranslationList } from "./pages/chapter-translations/ChapterTranslationList";
import { ChapterTranslationShow } from "./pages/chapter-translations/ChapterTranslationShow";
import { ChapterEdit } from "./pages/chapters/ChapterEdit";
import { ChapterList } from "./pages/chapters/ChapterList";
import { LanguageCreate } from "./pages/languages/LanguageCreate";
import { LanguageEdit } from "./pages/languages/LanguageEdit";
import { LanguageList } from "./pages/languages/LanguageList";
import { UserCreate } from "./pages/users/UserCreate";
import { UserEdit } from "./pages/users/UserEdit";
import { UserList } from "./pages/users/UserList";

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
    <Resource
      name="chapter-translations"
      options={{ label: "Chapter Translations" }}
      list={ChapterTranslationList}
      show={ChapterTranslationShow}
    />
  </Admin>
);
