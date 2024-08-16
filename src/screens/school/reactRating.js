import React from 'react';
import { View } from 'react-native';
import { Star } from 'lucide-react-native'; // Certifique-se de ter a biblioteca 'react-native-feather' instalada

const RatingReact = ({ nota }) => {
    const maxStars = 5;
    const filledStars = Math.min(Math.max(nota, 0), maxStars); // Garante que a nota esteja entre 0 e 5

    return (
        <View style={{ flexDirection: 'row' }}>
            {[...Array(maxStars)].map((_, index) => (
                <Star
                    key={index}
                    size={14}
                    color={index < filledStars ? '#EBD269' : '#858585'}
                />
            ))}
        </View>
    );
}

export default RatingReact;
