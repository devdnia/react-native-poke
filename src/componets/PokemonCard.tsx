import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import ImageColors from 'react-native-image-colors'

import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useRef } from 'react';


interface Props {
    pokemon: SimplePokemon;
}

const windowsWidth = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('grey');
    // Para saber si el componente está desmontado
    const isMounted = useRef(true);

    const navigation = useNavigation<any>();


    useEffect(() => {

        ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
            .then(colors => {
                // Para saber si el componente está desmontado
                if (!isMounted.current) return;

                (colors.platform === 'ios')
                    ? setBgColor(colors.background || 'grey')
                    : setBgColor(colors.dominant || 'grey')

            });

        // Para saber si el componente está desmontado
        return () => {
            isMounted.current = false;
        }
    }, [])



    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={ 
                () => navigation.navigate('PokemonScreen', { 
                    simplePokemon: pokemon,
                    color: bgColor 
                }
            )}

        >
            <View style={{
                ...styles.cardContainer,
                width: windowsWidth * 0.4,
                backgroundColor: bgColor
            }}>
                {/* Nombre del pokemon y el ID */}
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>


                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 20,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        // Sombra tarjeta
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokebolaContainer: {
        with: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5,
    },
    pokebola: {
        width: 100,
        height: 100,
        right: -20,
        bottom: -20,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },

})