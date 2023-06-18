import { ScrollView, Image, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails, fetchPlaces } from "../util/database";

function PlaceDetails({ route, navigation }) {

    const [fetchedPlace, setFetchedPlacec] = useState();

    function showOnMapHandler() {
        navigation.navigate('Map', {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng,
        });
    }
    // console.log(showOnMapHandler);
    console.log(fetchedPlace);
    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchedPlacec(place);
            navigation.setOptions({
                title: place.title,
            })
        }

        loadPlaceData();

    }, [selectedPlaceId])

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data ...</Text>
            </View>
        )
    }

    return (
        <ScrollView  >
            <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
                <OutlinedButton icon='map' onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    )
}
export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20,

    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    }
})