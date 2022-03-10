import React, { useEffect, useState } from 'react';

import { HomePanel } from '../components/HomePanel';
import { useDatabase } from '../contexts/FirestoreContext';

export const Home = () => {
        const {categorys, items} = useDatabase()

        const elements = [];
        const favouriteCount = 0;
        for(var i = 0; i < items.length; i++){
            if(items[i].isFavourite == true){
                favouriteCount++;
            }
        }
        elements.push(<HomePanel itemCount={favouriteCount} name="Favourites" color="red" icon="heart" key="0" link={"/favourites"}/>)

        for(var i = 0; i < categorys.length; i++){
            elements.push(<HomePanel itemCount="69" name={categorys[i].name} id={categorys[i].id} color={categorys[i].color} icon={categorys[i].icon} link={"/category"} key={i + 1}/>)
        }

    
    return <div className='h-screen'>
        <h1 className='font-bold text-xl ml-5'>Home</h1>
        <div className='grid grid-cols-2 gap-2 m-4 sm:grid-cols-3 md:grid-cols-4'>{elements}</div>
    </div>


};
