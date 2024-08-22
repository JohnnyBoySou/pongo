import AsyncStorage from "@react-native-async-storage/async-storage";
const key = '@PREFERENCES';

async function getPreferences() {
  try {
    const preferences = JSON.parse(await AsyncStorage.getItem(key)) || [];
    return preferences;
  } catch (error) {
    console.error("Error getting preferences:", error);
    return [];
  }
}

async function editPreferences(updatedPreferences) {
  try {
    const preferences = { ...getPreferences(), ...updatedPreferences };
    await AsyncStorage.setItem(key, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error editing preferences:", error);
    return false;
  }
}

async function createPreferences(preferences) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error("Error creating preference:", error);
    return false;
  }
}

async function excludePreferences() {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error excluding preference ", error);
    return false;
  }
}

export { getPreferences, editPreferences, createPreferences, excludePreferences, };