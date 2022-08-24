import appConfig from '../../app.json';

const translations = {
  common: {
    cancel: 'Anuluj',
    logIn: 'Zaloguj się',
    noInternetConnection: 'Brak internetu',
    somethingWentWrong: 'Coś poszło nie tak',
  },
  welcome: {
    hireHomeHelp: 'Wyszukaj pomoc domową',
    start: 'Rozpocznij',
    findHomeHelp: 'Znajdź pomoc domową w 10 minut',
    alreadyHaveAccount: 'Masz już konto?',
  },
  adList: {
    contentList: 'Treści',
  },
  settings: {
    settings: 'Ustawienia',
    account: 'Konto',
    signOutTitle: 'Wyloguj się',
    signOutSubtitle: 'Po wylogowaniu się, musisz zalogować się ponownie',
    signOutAction: 'Wyloguj',
    signOutDialogTitle: 'Wyloguj się',
    signOutDialogDescription: 'Czy na pewno chcesz się wylogować?',
  },
  account: {
    account: 'Profil uzytkownika',
  },
  location: {
    howCanWeHelpYou: 'Jak możemy Tobię pomóc?',
    location: 'Location',
    clientOrWorker: 'Are you looking for Home Help, or you are Home Help?',
    client: 'I am looking for Home Help',
    worker: 'I am Home Help',
    clientEmploymentType: 'I am looking for home help',
    workerEmploymentType: 'I am looking for client',
    yourLocation: 'Your location',
    detectLocation: 'Detect my location or set location manually',
  },
  map: {
    searchOrMoveTheMap: 'Search or move the map',
    whereAreYouLookingForHelp: 'Gdzie chcesz znaleźć pomoc domową?',
    whichAreYouWantToWork: 'W jakim rejonie chcesz pracować?',
    unableOpenSettings: 'Nie można otworzyć ustawień',
    locationDisabled: `Turn on Location Services to allow "${appConfig.displayName}" to determine your location. This is required to add your ad to listing`,
    locationPermissionDenied: 'Location permission denied',
    goToSettings: 'Go to Settings',
    dontUseLocation: "Don't Use Location",
    locationPermisssionRevoked: 'Location permission revoked by user',
    confirmLocation: 'Zatwierdź lokalizację',
  },
};

export default translations;
