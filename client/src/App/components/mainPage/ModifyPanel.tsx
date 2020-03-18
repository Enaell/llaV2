import React, { useState } from 'react';
import { Column } from '../common/Flexbox';
import AddIcon from '@material-ui/icons/Add';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import CloseIcon from '@material-ui/icons/Close';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';


const SideButton = ({children, onClick, squareSide}: {children: any, onClick: () => void, squareSide: string}) => {
  const buttonStyle = { 
    border: '#a8c1a3 solid 2px', 
    width: squareSide, 
    height: squareSide, 
    marginTop:'10px', 
    borderRadius:'20px', 
    cursor:'pointer'
  };  
  
  return (
  <div onClick={()=>{onClick()}} style={buttonStyle}>
    <Column
    horizontal={'center'} 
    vertical={'center'} 
    style={{width: '100%', height: '100%'}}
    >
      {children}
    </Column>
  </div>
)};

export const ModifyPanel = ({squareSide, onModify, setOnModify, saveModules, cancelModification}: {
  squareSide: string, 
  onModify: boolean,
  setOnModify: React.Dispatch<React.SetStateAction<boolean>>;
  saveModules: () => void;
  cancelModification: () => void;
}) => {
  const [opacity, setOpacity] = useState({opacity: 0.3} as {opacity: 0.3} | {})

  return (
    <div
      style={{
        ...opacity,
        height:'100%',
        transitionProperty: 'opacity',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out'
      }}
      onMouseOver={()=>{setOpacity({})}}
      onMouseLeave={()=>{setOpacity({opacity: 0.3})}}
    >
      <SideButton squareSide={squareSide} onClick={() => {}}>
        <AddIcon
          htmlColor={'#6b8268'} 
          titleAccess={'Add'} 
          style={{zIndex: 50, width: '80%', height: '80%'}}
        />
      </SideButton>
      { onModify ?
      <>
        <SideButton squareSide={squareSide} onClick={()=>{saveModules()}}>
          <SaveAltOutlinedIcon 
            htmlColor={'#6b8268'} 
            titleAccess={'Save'} 
            style={{zIndex: 50, width: '60%', height: '60%'}}
          />
        </SideButton>
        <SideButton squareSide={squareSide} onClick={()=>{cancelModification()}}>
          <CloseIcon 
            htmlColor={'#6b8268'} 
            titleAccess={'Cancel'} 
            style={{zIndex: 50, width: '60%', height: '60%'}}
          />
        </SideButton>
      </> :
      <SideButton squareSide={squareSide} onClick={() => setOnModify(true)}>
        <CreateOutlinedIcon 
          htmlColor={'#6b8268'} 
          titleAccess={'Modify'} 
          style={{zIndex: 50, width: '60%', height: '60%'}}
        />
      </SideButton>
      }
    </div>
  )
}