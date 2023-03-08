import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";

import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {

    const [isFeching, setIsFetching] = useState( true );
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const loadPokemons = async () => {

        const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon/?limit=1300');
        mapPokemonListToSimplePokemon( resp.data.results )

    }

    const mapPokemonListToSimplePokemon = ( pokemontList: Result[]) => {

        const newPokemonList : SimplePokemon[] = pokemontList.map(({ name, url }) => {

            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2 ]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`

            return { id, picture,name,}
        });

        setSimplePokemonList(newPokemonList);
        setIsFetching(false);
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isFeching,
        simplePokemonList,
    }
}
