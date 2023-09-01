import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Storage } from '@ionic/storage';
import { newspaper, addCircle, cog, settings } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import EntriesPage from './pages/EntriesPage';
import StorageContext from './models/StorageContext';
import { useRef, useEffect, useState } from 'react';
import AddEntryModal from './components/AddEntryModal/AddEntryModal';
import SettingsPage from './pages/SettingsPage';
import { Translation, TranslationProvider } from 'i18nano';
import { translations, DEFAULT_LANGUAGE } from '../i18n/index';
import SettingsService from './services/SettingsService';

setupIonicReact({mode: 'ios'});

const storage = new Storage();
storage.create();

const App: React.FC = () => {
  const [appRef, setAppRef] = useState<HTMLElement | null>();
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const settingsService = new SettingsService(storage);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  const setTheme = async (dark: boolean) => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#000" : "#fff");
  }

  useEffect(() => {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches || showModal);
  }, [showModal]);

  useEffect(() => {
    setAppRef(ref.current);
    settingsService.getSettings().then(s => setLanguage(s.language));
  }, []);

  return (
    <TranslationProvider translations={translations.common} language={language}>
      <StorageContext.Provider value={storage}>
        <IonApp>
          <AddEntryModal isOpen={showModal} close={() => setShowModal(false)} presentingElement={appRef!} />
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet ref={ref}>
                <Redirect exact from="/mood" to="/mood/home" />
                <Redirect exact from="/" to="/mood/home" />
                <Route path="/mood/home" render={() => <EntriesPage />} />
                <Route path="/mood/settings" render={() => <SettingsPage />} />
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="entries" href="/mood/home">
                  <IonIcon icon={newspaper} />
                  <IonLabel>
                    <Translation path="tabEntries"/>
                  </IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="calendar" href="/mood/calendar">
                  <IonIcon icon={calendar} />
                  <IonLabel>---</IonLabel>
                </IonTabButton> */}
                <IonTabButton tab="add" onClick={() => {setShowModal(true);}}>
                  <IonIcon icon={addCircle} />
                  <IonLabel>
                    <Translation path="tabAddEntry"/>
                  </IonLabel>
                </IonTabButton>
                {/* <IonTabButton tab="highlights" href="/mood/highlights">
                  <IonIcon icon={statsChart} />
                  <IonLabel>---</IonLabel>
                </IonTabButton> */}
                <IonTabButton tab="settings" href="/mood/settings">
                  <IonIcon icon={cog} />
                  <IonLabel>
                    <Translation path="tabSettings"/>
                  </IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      </StorageContext.Provider>
    </TranslationProvider>
  );
}

export default App;
