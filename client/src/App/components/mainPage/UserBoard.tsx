import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { ModuleBlock } from './moduleBlocks/ModuleBlock';
import { Column, Row } from "../common/Flexbox";
import {Layout} from 'react-grid-layout';
import { UserModulesType, PositionType, BreakpointType, ModuleUrlType, UserBoardType } from '../common/types'
import { ModifyPanel } from "./ModifyPanel";


const ResponsiveGridLayout = WidthProvider(Responsive);

const gridLayouts : {[bp in BreakpointType]: {[key: string]: Layout;};} = { 
  lg: {
    news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
    fastExercice : {i: 'fastExercice', x: 5, y: 0, w: 6, h: 2, isResizable: false, isDraggable: false},
    wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false},
    culture: {i: 'culture', x: 0, y: 0, w: 3, h: 2, isResizable: false, isDraggable: false},
    manga: {i: 'manga', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false}
  },
  md: {
    news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
    fastExercice : {i: 'fastExercice', x: 5, y: 0, w: 6, h: 2, isResizable: false, isDraggable: false},
    wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false},
    culture: {i: 'culture', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false},
    manga: {i: 'manga', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false}
  }, 
  sm: {
    news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
    fastExercice : {i: 'fastExercice', x: 3, y: 0, w: 3, h: 4, isResizable: false, isDraggable: false},
    wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false},
    culture: {i: 'culture', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false},
    manga: {i: 'manga', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false}
  }, 
  xs: {
    news: {i: 'news', x: 0, y: 0, w: 4, h: 4, minW: 1, maxW: 4, minH: 1, maxH: 4, isResizable: false, isDraggable: false},
    fastExercice : {i: 'fastExercice', x: 3, y: 0, w: 3, h: 4, isResizable: false, isDraggable: false},
    wordOfTheDay: {i: 'wordOfTheDay', x: 0, y: 1, w: 3, h: 2, isResizable: false, isDraggable: false},
    culture: {i: 'culture', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false},
    manga: {i: 'manga', x: 0, y: 2, w: 3, h: 2, isResizable: false, isDraggable: false}  
  }
}

function updateLayout(layout: Layout, newPos: PositionType, onModify: boolean) {
  const newLayout = {...layout};
  newLayout.x = newPos.x;
  newLayout.y = newPos.y;
  newLayout.w = newPos.w;
  newLayout.h = newPos.h;
  newLayout.isDraggable = onModify;
  newLayout.isResizable = onModify;
  return newLayout;
}

function getLayoutToAdd(
  userModules: UserModulesType, 
  gridLayouts: {[bp in BreakpointType]: {[key: string]: Layout;};},
  breakPoint: BreakpointType
) {
  return Object.keys(gridLayouts[breakPoint]).filter((moduleName)=> {
    return !userModules[moduleName];
  })
}

function layoutsAreResizable(layouts: {lg: Layout[];md: Layout[];sm: Layout[];xs: Layout[];}, onModify: boolean) {
  return ({
    lg: layouts.lg.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    md: layouts.md.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    sm: layouts.sm.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
    xs: layouts.xs.map((l: Layout)=> ({...l, isResizable: onModify, isDraggable: onModify })),
  })
}

function getBlocksLayoutsFromModule(modules: UserModulesType, onModify: boolean) {
  return {
    lg: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.lg[moduleName], modules[moduleName].lg, onModify)),
    md: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.md[moduleName], modules[moduleName].md, onModify)),
    sm: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.sm[moduleName], modules[moduleName].sm, onModify)),
    xs: Object.keys(modules).map(moduleName => updateLayout(gridLayouts.xs[moduleName], modules[moduleName].xs, onModify))
  }
}


export const UserBoard = ({
  userModules,
  updateUserBoard,
  goToPage,
  handleBreakpointChange,
  marginLeft
} : UserBoardType) => {

  const [onModify, setOnModify] = useState(false);

  const [newUserModules, setNewUserModules] = useState({...userModules});

  const [layouts, setLayouts] = useState(getBlocksLayoutsFromModule({...userModules}, onModify))

  const [breakPoint, setBreakPoint] = useState('lg' as BreakpointType);

  const [addingModule, setAddingModule] = useState(false);

  const onLayoutChange = (layout: Layout[]) => {
    let newModules: UserModulesType = {...newUserModules};
    layout.forEach(element => {
      if(newModules[element.i])
        newModules[element.i][breakPoint] = {x: element.x, y: element.y, w: element.w, h:element.h}
    });
    setNewUserModules(newModules);
  }
  const saveUserBoard = async () => {
      await updateUserBoard(newUserModules);
      setAddingModule(false);
      setOnModify(false);
  }  
  const deleteModule = (moduleName: string ) => {
    let newModules = {...newUserModules};
    delete newModules[moduleName];
    setNewUserModules(newModules);
  }

  const addModule = async (moduleToAdd: string, gridLayouts: {[bp in BreakpointType]: {[key: string]: Layout;};}) => {
    let newModules: UserModulesType = {...newUserModules};
    let newUserBoardModules: UserModulesType = {...userModules};

    newModules[moduleToAdd] = {
      lg:{x: gridLayouts.lg[moduleToAdd].x, y: gridLayouts.lg[moduleToAdd].y, w: gridLayouts.lg[moduleToAdd].w, h: gridLayouts.lg[moduleToAdd].h},
      md:{x: gridLayouts.md[moduleToAdd].x, y: gridLayouts.md[moduleToAdd].y, w: gridLayouts.md[moduleToAdd].w, h: gridLayouts.md[moduleToAdd].h},
      sm:{x: gridLayouts.sm[moduleToAdd].x, y: gridLayouts.sm[moduleToAdd].y, w: gridLayouts.sm[moduleToAdd].w, h: gridLayouts.sm[moduleToAdd].h},
      xs:{x: gridLayouts.xs[moduleToAdd].x, y: gridLayouts.xs[moduleToAdd].y, w: gridLayouts.xs[moduleToAdd].w, h: gridLayouts.xs[moduleToAdd].h},
    }

    newUserBoardModules[moduleToAdd] = {
      lg:{x: gridLayouts.lg[moduleToAdd].x, y: gridLayouts.lg[moduleToAdd].y, w: gridLayouts.lg[moduleToAdd].w, h: gridLayouts.lg[moduleToAdd].h},
      md:{x: gridLayouts.md[moduleToAdd].x, y: gridLayouts.md[moduleToAdd].y, w: gridLayouts.md[moduleToAdd].w, h: gridLayouts.md[moduleToAdd].h},
      sm:{x: gridLayouts.sm[moduleToAdd].x, y: gridLayouts.sm[moduleToAdd].y, w: gridLayouts.sm[moduleToAdd].w, h: gridLayouts.sm[moduleToAdd].h},
      xs:{x: gridLayouts.xs[moduleToAdd].x, y: gridLayouts.xs[moduleToAdd].y, w: gridLayouts.xs[moduleToAdd].w, h: gridLayouts.xs[moduleToAdd].h},
    }

    setNewUserModules(newModules);
    await updateUserBoard(newUserBoardModules);
    setAddingModule(true);
    setOnModify(true);
  }


  useEffect(()=> {
    setLayouts(getBlocksLayoutsFromModule({...userModules}, onModify));
    setNewUserModules(userModules);
  }, [userModules])


  useEffect(() => {
    setLayouts(layoutsAreResizable(layouts, onModify));
  }, [onModify]);

  useEffect(() => {
    handleBreakpointChange(breakPoint);
  }, [breakPoint]);

  return (
    <>
      <ResponsiveGridLayout 
        onLayoutChange={(layout)=>onLayoutChange(layout)}
        onBreakpointChange={(newBreakpoint: BreakpointType, _newCols: number) => { setBreakPoint(newBreakpoint)}}
        style={{ width:'80%', maxWidth:'1300px', marginLeft: `${marginLeft}px`}} 
        className="layout" 
        layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4}}
        rowHeight={150}
        width={1300}>
          {Object.keys(userModules).map((m) =>  
            <Column style={{with:'100%'}} key={m}>
              <ModuleBlock 
                onModify={onModify} 
                setOnModify={setOnModify} 
                name={ m as ModuleUrlType } 
                deleteModule={deleteModule} 
                saveModules={saveUserBoard}
                cancelModification={()=>{setOnModify(false);}}
                goToPage={goToPage}
              /> 
            </Column>)}
      </ResponsiveGridLayout>
      <ModifyPanel
        squareSide={marginLeft} 
        onModify={onModify}
        setOnModify={setOnModify}
        saveModules={saveUserBoard}
        cancelModification={() => setOnModify(false)}
        addOptions={getLayoutToAdd(newUserModules, gridLayouts, breakPoint)}
        handleAddSelect={moduleName => addModule(moduleName, gridLayouts)}
        addingModule={addingModule}
      />
    </>
  )
}