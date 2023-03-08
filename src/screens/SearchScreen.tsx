import React, { useState } from 'react';
import { View, Text, Platform, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from '../theme/appTheme';
import { PokemonCard } from '../componets/PokemonCard';
import { SearchInput } from '../componets/SeacrhInput';
import { usePokemonSearch } from '../hooks/UsePokemonSearch';
import { Loading } from '../componets/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { useEffect } from 'react';


const screenWidth = Dimensions.get('window').width;


export const SearchScreen = () => {


   const { top } = useSafeAreaInsets();
   const { isFeching, simplePokemonList } = usePokemonSearch();

   const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

   const [term, setTerm] = useState('');

   useEffect(() => {

      if (term.length === 0) {
         return setPokemonFiltered([]);
      }

      if( isNaN(Number(term)) ){
         setPokemonFiltered(
            simplePokemonList.filter(
               (poke) => poke.name.toLocaleLowerCase()
                  .includes(term.toLocaleLowerCase())
            )
         );
      } else {
         const pokemonById = simplePokemonList.find((poke) => poke.id === term);
         setPokemonFiltered(
            ( pokemonById ) ? [pokemonById] : []
         );
      }




   }, [term])



   if (isFeching) {
      return <Loading />
   }

   return (
      <View style={{
         flex: 1,
      }}>

         <SearchInput
            onDebounce={setTerm}
            style={{
               position: 'absolute',
               marginLeft: 10,
               zIndex: 999,
               width: screenWidth - 20,
               top: (Platform.OS === 'ios') ? top : top + 10

            }} />

         <FlatList
            data={pokemonFiltered}
            keyExtractor={(pokemon) => pokemon.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}

            // Header
            ListHeaderComponent={
               <Text style={{
                  ...styles.title,
                  ...styles.globalMargin,
                  marginTop: (Platform.OS === 'ios') ? top + 60 : top + 80,
                  paddingBottom: 10,
                  color: 'grey',
                  fontWeight: '900'
               }}
               >
                  {term}
               </Text>}

            renderItem={({ item }) => (
               <PokemonCard pokemon={item} />
            )}

         />

      </View>
   )
};

