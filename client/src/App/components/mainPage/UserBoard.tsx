import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { ModuleBlock } from './moduleBlocks/ModuleBlock';
import { Column } from "../common/Flexbox";
import {Layout} from 'react-grid-layout';
import { UserModulesType, PositionType, BreakpointType, ModuleUrlType } from '../common/types'


const ResponsiveGridLayout = WidthProvider(Responsive);

const lgGridLayouts: {[key: string]: Layout} = {
  news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
  fastExercice : {i: 'fastExercice', x: 5, y: 0, w: 6, h: 2, isResizable: false, isDraggable: false},
  wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false}
}

const mdGridLayouts: {[key: string]: Layout} = {
  news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
  fastExercice : {i: 'fastExercice', x: 5, y: 0, w: 6, h: 2, isResizable: false, isDraggable: false},
  wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false}
}

const smGridLayouts: {[key: string]: Layout} = {
  news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
  fastExercice : {i: 'fastExercice', x: 3, y: 0, w: 3, h: 4, isResizable: false, isDraggable: false},
  wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false}
}

const xsGridLayouts: {[key: string]: Layout} = {
    news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
    fastExercice : {i: 'fastExercice', x: 3, y: 0, w: 3, h: 4, isResizable: false, isDraggable: false},
    wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 1, w: 3, h: 2, isResizable: false, isDraggable: false}
}

function updateLayout(layout: Layout, newPos: PositionType) {
  const newLayout = {...layout};
  newLayout.x = newPos.x;
  newLayout.y = newPos.y;
  newLayout.w = newPos.w;
  newLayout.h = newPos.h;
  return newLayout;
}


function layoutsAreResizable(layouts: {lg: Layout[];md: Layout[];sm: Layout[];xs: Layout[];}, onModify: boolean) {
  return ({
    lg: layouts.lg.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    md: layouts.md.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    sm: layouts.sm.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    xs: layouts.xs.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
  })
}

function getBlocksLayoutsFromModule(modules: UserModulesType) {
  return {
    lg: Object.keys(modules).map(moduleName => updateLayout(lgGridLayouts[moduleName], modules[moduleName].lg)),
    md: Object.keys(modules).map(moduleName => updateLayout(mdGridLayouts[moduleName], modules[moduleName].md)),
    sm: Object.keys(modules).map(moduleName => updateLayout(smGridLayouts[moduleName], modules[moduleName].sm)),
    xs: Object.keys(modules).map(moduleName => updateLayout(xsGridLayouts[moduleName], modules[moduleName].xs))
  }
}


export const UserBoard = ({userModules, onModify, setOnModify, setNewUserModules, saveModules, cancelModification, goToPage} : {
    userModules: UserModulesType; 
    onModify: boolean;
    setNewUserModules: React.Dispatch<React.SetStateAction<{}>>;
    setOnModify: React.Dispatch<React.SetStateAction<boolean>>;
    saveModules: () => void;
    cancelModification: () => void;
    goToPage: (url: string) => void
  }) => {

  const [layouts, setLayouts] = useState(getBlocksLayoutsFromModule({...userModules}))

  const [breakPoint, setBreakPoint] = useState('lg' as BreakpointType);

  const onLayoutChange = (layout: Layout[]) => {
    let newModules = {...userModules};
    layout.forEach(element => 
      newModules[element.i][breakPoint] = {x: element.x, y: element.y, w: element.w, h:element.h}
    );
    setNewUserModules(newModules);
  }

  const deleteModule = (moduleName: string ) => {
    console.log(`DeleteModule ${moduleName}`);
    let newModules = {...userModules};
    delete newModules[moduleName];
    console.log(newModules[moduleName]);
    console.log(newModules);
    setNewUserModules(newModules);
  }

  useEffect(()=> {
    setLayouts(getBlocksLayoutsFromModule(userModules));
  }, [userModules])


  useEffect(() => {
    setLayouts(layoutsAreResizable(layouts, onModify))
  }, [onModify]);

  return (
    <ResponsiveGridLayout 
      onLayoutChange={(layout)=>onLayoutChange(layout)}
      onBreakpointChange={(newBreakpoint: BreakpointType, _newCols: number) => { setBreakPoint(newBreakpoint)}}
      style={{ width:'80%', maxWidth:'1300px'}} 
      className="layout" 
      layouts={layouts}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4}}
      width={1300}>
        {Object.keys(userModules).map((m) =>  
          <Column style={{with:'100%'}} key={m}>
            <ModuleBlock 
              onModify={onModify} 
              setOnModify={setOnModify} 
              name={ m as ModuleUrlType } 
              deleteModule={deleteModule} 
              saveModules={saveModules}
              cancelModification={cancelModification}
              goToPage={goToPage}
            /> 
          </Column>)}
    </ResponsiveGridLayout>
  )
}