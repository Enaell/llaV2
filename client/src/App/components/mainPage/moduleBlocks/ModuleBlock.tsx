import React, { useState } from 'react';
import {ModuleBlockHeader} from './ModuleBlockHeader'
import { FastExerciceBlock } from "./FastExerciceBlock";
import { NewsBlock } from "./NewsBlock";
import { Column, Row } from '../../common/Flexbox';
  
  
const getBlockFromModule = (moduleName: string) => {
    switch(moduleName){
      case 'fastExercice': 
        return <FastExerciceBlock />  
      case 'news':
        return <NewsBlock name={moduleName} />
    }
  }

export const ModuleBlock = ({ name, onModify, setOnModify }
  : { 
      name: string, 
      onModify: boolean, 
      setOnModify: React.Dispatch<React.SetStateAction<boolean>> 
    }) => {
  const [onHover, setOnHover] = useState(false);
  return (
      <div style={{ width: '100%', height: '100%' }} onMouseEnter={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>
        <ModuleBlockHeader name={name} displayed={ onHover } onModify= {onModify} setOnModify={setOnModify} />
        <Column 
          horizontal={'center'} 
          vertical={'center'} 
          style={{ border: '#a8c1a3 solid 2px', width: '100%', height: '100%'}} 
          key={name} 
        >
          {getBlockFromModule(name)} 
        </Column>
      </div>
    )
}