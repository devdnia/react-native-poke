import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';



interface Props {
   pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {

   return (

      <ScrollView
         showsVerticalScrollIndicator={false}
         style={{
            // Para que ocupe toda la pantalla y con el scroll vaya detrás de la imagen
            ...StyleSheet.absoluteFillObject,
         }}
      >
         {/* Types y peso*/}
         <View
            style={{
               ...styles.container,
               marginTop: 370,
            }}
         >
            <Text style={styles.title}>Tipo</Text>

            <View style={{ flexDirection: 'row' }}>
               {
                  pokemon.types.map(({ type }) => (
                     <Text
                        style={{
                           ...styles.regularText,
                           marginRight: 10

                        }}
                        key={type.name}
                     >
                        {type.name}
                     </Text>
                  ))
               }

            </View>
            <Text style={styles.title}>Peso</Text>
            <Text style={styles.regularText}>{pokemon.weight}kg</Text>
         </View>
         {/* Sprites */}
         <View style={styles.container}>
            <Text style={styles.title}>Sprites</Text>
         </View>

         <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}

         >
            <FadeInImage
               style={styles.basicSprite}
               uri={pokemon.sprites.front_default}
            />

            <FadeInImage
               style={styles.basicSprite}
               uri={pokemon.sprites.back_default}
            />


            <FadeInImage
               style={styles.basicSprite}
               uri={pokemon.sprites.front_shiny}
            />


            <FadeInImage
               style={styles.basicSprite}
               uri={pokemon.sprites.back_shiny}
            />


         </ScrollView>

         {/* Habilidades */}
         <View
            style={{
               ...styles.container,
            }}
         >
            <Text style={styles.title}>Habilidades al nacer</Text>

            <View style={{ flexDirection: 'row' }}>
               {
                  pokemon.abilities.map(({ ability }) => (
                     <Text
                        style={{
                           ...styles.regularText,
                           marginRight: 10

                        }}
                        key={ability.name}
                     >
                        {ability.name}
                     </Text>
                  ))
               }

            </View>
         </View>

         {/* Movimientos */}
         <View
            style={{
               ...styles.container,
            }}
         >
            <Text style={styles.title}>Movimientos</Text>

            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
               {
                  pokemon.moves.map(({ move }) => (
                     <Text
                        style={{
                           ...styles.regularText,
                           marginRight: 10,
                        }}
                        key={move.name}
                     >
                        {move.name}
                     </Text>
                  ))
               }

            </View>
         </View>

         {/* Stats */}
         {/* Movimientos */}
         <View
            style={{
               ...styles.container,
            }}
         >
            <Text style={styles.title}>Puntos de habilidades</Text>

            <View>
               {
                  pokemon.stats.map((stat) => (
                     <View
                        style={{ flexDirection: 'row' }}
                        key={stat.stat.name + 1}

                     >
                        <Text
                           style={{
                              ...styles.regularText,
                              marginRight: 10,
                              width: 180,
                           }}

                        >
                           {stat.stat.name}
                        </Text>

                        <Text
                           style={{
                              ...styles.regularText,
                              fontWeight: 'bold',

                           }}
                        >
                           {stat.base_stat}
                        </Text>
                     </View>
                  ))
               }
            </View>
            {/* Sprite final */}
            <View style={{
               marginBottom: 20,
               alignItems: 'center',
            }}>
               <FadeInImage
                  style={styles.basicSprite}
                  uri={pokemon.sprites.front_default}
               />
            </View>
         </View>

      </ScrollView>

   )
};


const styles = StyleSheet.create({
   container: {
      marginHorizontal: 20,
   },
   title: {
      fontWeight: 'bold',
      fontSize: 22,
      marginTop: 20
   },
   regularText: {
      fontSize: 19
   },
   basicSprite: {
      width: 100,
      height: 100,
   }

});