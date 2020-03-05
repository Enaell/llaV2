import React from 'react';
import { Row } from '../../common/Flexbox';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import FastForwardOutlinedIcon from '@material-ui/icons/FastForwardOutlined';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import InputOutlinedIcon from '@material-ui/icons/InputOutlined';

import { Typography, Button } from '@material-ui/core';

export const ModuleBlockHeader = ({displayed, name, onModify,  setOnModify} : 
{
    displayed: boolean; 
    name: string
    onModify: boolean;
    setOnModify: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
      <Row horizontal={'space-between'} vertical={'center'} style={{width: 'calc(100% + 4px)', height:'50px', position: 'absolute', zIndex: '2'}}>
        <Typography style={{ paddingLeft: '20px' }} variant='h6' color={'initial'}>{name}</Typography>
        { displayed &&
        <div>
          { !onModify ?
          <>
            <Button onClick={() => setOnModify(true)}>
              <CreateOutlinedIcon color='action' titleAccess={'Modify'}/>
            </Button>
            <Button onClick={() => {}}>
              <DoubleArrowOutlinedIcon color='action' titleAccess={'Modify'}/>
            </Button>
            {/* <Button onClick={() => setOnModify(true)}>
              <FastForwardOutlinedIcon color='action' titleAccess={'Modify'}/>
            </Button>
            <Button onClick={() => setOnModify(true)}>
              <ForwardOutlinedIcon color='action' titleAccess={'Modify'}/>
            </Button>
            <Button onClick={() => setOnModify(true)}>
              <InputOutlinedIcon color='action' titleAccess={'Modify'}/>
            </Button> */}
          </>
          : 
          <>
            <Button>
              <SaveAltOutlinedIcon color='action' titleAccess={'Delete'}/>
            </Button>
            <Button>
              <DeleteOutlinedIcon color='action' titleAccess={'Delete'}/>
            </Button>
            <Button>
              <CloseIcon color='action' titleAccess={'Cancel'}/>
            </Button>
          </>}
        </div>}
      </Row>
  );
};