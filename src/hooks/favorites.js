import AsyncStorage from "@react-native-async-storage/async-storage";
const key = '@FAVORITES';

async function getFavorites() {
    try {
        const preferences = JSON.parse(await AsyncStorage.getItem(key)) || [];
        return preferences;
    } catch (error) {
        console.error("Error getting preferences:", error);
        return [];
    }
}


async function editFavorite(array) {
    try {
      const favs = { ...getFavorites(), ...array };
      await AsyncStorage.setItem(key, JSON.stringify(favs));
      return true;
    } catch (error) {
      console.error("Error editing preferences:", error);
      return false;
    }
  }


async function addFavorite(array) {
    try {
        const favs = await getFavorites();
        if (!favs) {
           favs = [];
        }
        favs = favs.concat(array);
        await editFavorite(preferences);
        return true;
    } catch (error) {
        console.error("Error adding favorites array:", error);
        return false;
    }
}

async function verifyFavorite(id) {
    try {
        const favs = await getFavorites();
        return favs && favs.some((itm) => itm.id === id);
    } catch (error) {
        console.error("Error verifying favorites", error);
        return false;
    }
}

async function removeFavorite(id) {
    try {
        const favs = await getFavorites();
        if (!favs) {
            favs = [];
        }
        favs = favs.filter((itm) => itm.id !== id);
        await editFavorite(favs);
        return true;
    } catch (error) {
        console.error("Error removing favorite:", error);
        return false;
    }
}

export { getFavorites, editFavorite, addFavorite, verifyFavorite, removeFavorite };