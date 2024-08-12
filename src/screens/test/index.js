import React from 'react';
import { View, Button, ScrollView } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const TestScreen = () => {
  const navigation = useNavigation();

  const routes = useNavigationState(state => state.routeNames);

  return (
    <ScrollView>
      <View style={{ padding: 16, rowGap: 12, }}>
        {routes.map((routeName, index) => (
          <Button
            key={index}
            title={routeName}
            onPress={() => navigation.navigate(routeName)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default TestScreen;
