import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { ModuleBlock, lgGridLayouts, mdGridLayouts, smGridLayouts, xsGridLayouts } from './moduleBlocks/ModuleBlock';
import { Column } from "../common/Flexbox";

const ResponsiveGridLayout = WidthProvider(Responsive);

type UserModulesType = {
  name: string;
  lgPosition: 
    { 
      x: number; 
      y: number; 
      w: number; 
      h: number;
    };
  mdPosition: 
    {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  smPosition: 
    {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  xsPosition:
    {
      x: number;
      y: number;
      w: number;
      h: number;
    };    
}

type UserGridType = {
  userModules: UserModulesType[]
} 


function getBlocksLayoutsFromModule(modules: UserModulesType[]) {
  return {
    lg: modules.map(m => lgGridLayouts[m.name]),
    md: modules.map(m => mdGridLayouts[m.name]),
    sm: modules.map(m => smGridLayouts[m.name]),
    xs: modules.map(m => xsGridLayouts[m.name])
  }
}

export const UserBoard = ({userModules} : UserGridType) => {

  const [layouts, setLayouts] = useState(getBlocksLayoutsFromModule(userModules))

  return (
    <ResponsiveGridLayout style={{ width:'80%', maxWidth:'1200px'}} className="layout" layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4}}>

        {userModules.map(m =>  
          <Column style={{with:'100%'}} key={m.name}> 
            <ModuleBlock name={ m.name }/> 
          </Column>)}

    </ResponsiveGridLayout>
  )
}