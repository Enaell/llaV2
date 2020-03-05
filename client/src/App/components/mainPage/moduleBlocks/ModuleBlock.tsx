import React, { useState } from 'react';
import {ModuleBlockHeader} from './ModuleBlockHeader'
import { FastExerciceBlock } from "./FastExerciceBlock";
import { NewsBlock } from "./NewsBlock";
import { Column, Row } from '../../common/Flexbox';
import translate from 'counterpart';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
  
const getBlockFromModule = (moduleName: string) => {
    switch(moduleName){
      case 'fastExercice': 
        return <FastExerciceBlock />  
      case 'news':
        return <NewsBlock name={moduleName} />
    }
  }

export const ModuleBlock = ({ name, onModify, setOnModify, deleteModule, saveModules, cancelModification } :
  { 
    name: string;
    onModify: boolean; 
    setOnModify: React.Dispatch<React.SetStateAction<boolean>>;
    deleteModule: (moduleName: string) => void;
    saveModules: () => void;
    cancelModification: () => void;
  }) => {
  const [onHover, setOnHover] = useState(false);

  const [deleted, setDeleted] = useState(undefined as {} | undefined)

  const deleteModulePreview = () => {
    setDeleted({opacity: 0.4});
    deleteModule(name);
  }

  return (
      <>
        { deleted &&
        <DeleteOutlinedIcon 
          htmlColor={'#6b8268'} 
          titleAccess={'Deleted'} 
          style={{position: 'absolute', zIndex: 50, width: '100%', height: '100%'}}
        />}
        <div style={{ width: '100%', height: '100%', ...deleted }} onMouseEnter={() => {setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}}>
          <ModuleBlockHeader 
            prettyName={translate(`moduleBlock.${name}`)} 
            displayed={ onHover } 
            onModify= {onModify} 
            setOnModify={setOnModify} 
            deleteModule={deleteModulePreview} 
            saveModules={saveModules}
            cancelModification={cancelModification}
          />
          <Column 
            horizontal={'center'} 
            vertical={'center'} 
            style={{ border: '#a8c1a3 solid 2px', width: '100%', height: '100%'}} 
            key={name} 
          >
            {getBlockFromModule(name)} 
          </Column>
        </div>
      </>
    )
}