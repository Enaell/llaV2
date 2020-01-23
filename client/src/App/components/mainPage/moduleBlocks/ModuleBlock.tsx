import React from 'react';
import { FastExerciceBlock } from "./FastExerciceBlock";
import { NewsBlock } from "./NewsBlock";
import {Layout} from 'react-grid-layout'
import { Column } from '../../common/Flexbox';


export const lgGridLayouts: {[key: string]: Layout} = {
    news: {i: 'news', x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4, minH: 2, maxH: 3},
    fastExercice : {i: 'fastExercice', x: 5, y: 0, w: 6, h: 2, isResizable: false}
  }
  
  export const mdGridLayouts: {[key: string]: Layout} = {
    news: {i: 'news', x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4, minH: 2, maxH: 3},
    fastExercice : {i: 'fastExercice', x: 5, y: 0, w: 6, h: 2, isResizable: false}
  }
  
  export const smGridLayouts: {[key: string]: Layout} = {
    news: {i: 'news', x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 4, minH: 2, maxH: 3},
    fastExercice : {i: 'fastExercice', x: 3, y: 0, w: 3, h: 4, isResizable: false}
  }
  
  export const xsGridLayouts: {[key: string]: Layout} = {
    news: {i: 'news', x: 0, y: 0, w: 1, h: 1, minW: 2, maxW: 4, minH: 2, maxH: 3},
    fastExercice : {i: 'fastExercice', x: 3, y: 0, w: 3, h: 4, isResizable: false}
  }
  
  

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