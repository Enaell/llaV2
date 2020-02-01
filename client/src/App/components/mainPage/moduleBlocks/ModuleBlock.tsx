import React from 'react';
import { FastExerciceBlock } from "./FastExerciceBlock";
import { NewsBlock } from "./NewsBlock";
import { Column } from '../../common/Flexbox';
  
  
const getBlockFromModule = (moduleName: string) => {
    switch(moduleName){
      case 'fastExercice': 
        return <FastExerciceBlock />  
      case 'news':
        return <NewsBlock name={moduleName} />
    }
  }
  

export const ModuleBlock = ({ name }: { name: string }) => {
    return (
        <Column 
          horizontal={'center'} 
          vertical={'center'} 
          style={{ border: '#a8c1a3 solid 2px', width: '100%', height: '100%'}} 
          key={name} 
        >
          {getBlockFromModule(name)} 
        </Column>
    )
}