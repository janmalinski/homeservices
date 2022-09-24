import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { FullScreenTemplate, ListItem, WavyHeader } from '@src/components';
import { useTranslation } from 'react-i18next';
import { spacing, colors } from '@src/components';
import { UserProfilePicturePicker } from './UserProfilePicturePicker';
import { useAppDispatch, useAppSelector } from '@src/store';
import { fetchUserThunk } from '@src/User/userStore';
// import { useScreenOptions } from 'app/lib/navigation';
// import { actions, selectors } from 'app/store';
// import * as Types from 'app/types';

// import { UserProfilePicturePicker } from './components/UserProfilePicturePicker';

// export type Props = Types.MainTabScreenProps<Types.Route.Settings>;

export const SettingsScreen = () => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.user);
  // const token = useSelector(selectors.isLoggedIn);

  // const openSignOutDialog = useCallback(() => {
  //   navigation.navigate(Types.Route.SingOutDialog);
  // }, []);

  // const goToAccount = useCallback(() => {
  //   navigation.navigate(Types.Route.Account);
  // }, []);

  // useScreenOptions({
  //   headerColor: 'primary',
  // });

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  const Header = (
    <View style={styles.header}>
      <WavyHeader
        style={styles.wave}
        height={200}
        top={165}
        color={colors.blue400}
      />
      <UserProfilePicturePicker initialImageURL={user?.avatarUrl as string} />
    </View>
  );

  const navigateToAccount = () => {};

  return (
    <FullScreenTemplate
      header={Header}
      padded
      bottomNavigationPad
      isLoading={false}>
      <ListItem
        rightComponent="chevron"
        icon={{ name: 'person-outline' }}
        title={t('settings.account')}
        subtitle="testowy"
        onPress={() => navigateToAccount}
        raised
      />
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 280,
  },
  wave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: -spacing.large,
  },
});
