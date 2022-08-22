import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { Button, Text, FullScreenTemplate } from '@src/components';
import { colors, spacing } from '@src/components';
import { useAppSelector, useAppDispatch } from '@src/store';
import {
  fetchRolesThunk,
  fetchTypesOfEmploymentThunk,
} from './assessmentStore';
import { Payload } from './assessmentStore';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';

export const AssessmentScreen = () => {
  const [mapButtonPressed, setMapButtonPressed] = useState(false);
  const [userType, setUserType] = useState({ id: '', name: '' });
  const [typeOfEmployment, setTypeOfEmployment] = useState<string>('');

  const dispatch = useAppDispatch();

  const roles: Payload[] = useAppSelector(state => state.assessment.roles);
  const typesOfEmployment: Payload[] = useAppSelector(
    state => state.assessment.typesOfEmployment,
  );

  const navigation =
    useNavigation<StackNavigationProp<TRootNavigatorParams, 'Assessment'>>();

  const [t] = useTranslation();

  useEffect(() => {
    dispatch(fetchRolesThunk());
    dispatch(fetchTypesOfEmploymentThunk());
  }, [dispatch]);

  const handlePresstypeOfEmploymentButton = useCallback(
    (id: string) => {
      setTypeOfEmployment(id);
    },
    [setTypeOfEmployment],
  );
  const navigateToMap = useCallback(() => {
    setMapButtonPressed(true);
    navigation.navigate('Map', {
      redirectAfterSubmit: 'SignUp',
      userType,
    });
  }, [setMapButtonPressed, navigation, userType]);

  return (
    <FullScreenTemplate safeArea padded>
      {roles?.length > 0 && (
        <Text typography="title3" style={styles.firstHeader}>
          {t('location.clientOrWorker')}
        </Text>
      )}
      <View style={styles.row}>
        {roles?.map(
          (item: Payload) =>
            item.name !== 'Admin' && (
              <Button
                key={item.id}
                buttonStyle={styles.button}
                variant={userType.id === item.id ? 'SECONDARY' : 'PRIMARY'}
                titleStyle={styles.buttonTitle}
                title={t(
                  item.name === 'Help' ? 'location.worker' : 'location.client',
                )}
                onPress={() => setUserType({ id: item.id, name: item.name })}
              />
            ),
        )}
      </View>
      {userType?.id !== '' && (
        <>
          <Text typography="title3" style={styles.header}>
            {userType.name === 'Client'
              ? t('location.clientEmploymentType')
              : t('location.workerEmploymentType')}
          </Text>
          <View style={styles.row}>
            {typesOfEmployment?.map(
              (typeemployment: { id: string; name: string }) => (
                <Button
                  key={typeemployment.id}
                  buttonStyle={{ flex: 1 / typesOfEmployment.length - 0.04 }}
                  variant={
                    typeOfEmployment === typeemployment.id
                      ? 'SECONDARY'
                      : 'PRIMARY'
                  }
                  titleStyle={styles.buttonTitle}
                  title={typeemployment.name}
                  onPress={() =>
                    handlePresstypeOfEmploymentButton(typeemployment.id)
                  }
                />
              ),
            )}
          </View>
        </>
      )}
      {typeOfEmployment.length > 0 && (
        <View>
          <Text typography="title3" style={styles.header}>
            {t('location.yourLocation')}
          </Text>
          <Button
            buttonStyle={styles.button}
            variant={mapButtonPressed ? 'SECONDARY' : 'PRIMARY'}
            titleStyle={styles.buttonTitle}
            title={t('location.detectLocation')}
            onPress={navigateToMap}
          />
        </View>
      )}
    </FullScreenTemplate>
  );
};

interface IStyles {
  firstHeader: TextStyle;
  header: TextStyle;
  row: ViewStyle;
  button: ViewStyle;
  buttonTitle: TextStyle;
}

const stylesDef: IStyles = {
  firstHeader: {
    marginBottom: spacing.tiny,
  },
  header: {
    marginTop: spacing.xxxLarge,
    marginBottom: spacing.tiny,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
    height: 60,
  },
  buttonTitle: {
    color: colors.black,
  },
};

const styles = StyleSheet.create(stylesDef);
