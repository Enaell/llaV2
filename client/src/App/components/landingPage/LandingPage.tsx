import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Column, Row } from '../common/Flexbox';

import translate from 'counterpart';
import WelcomeSection from './welcomeSection';
import { InformationPanel } from './informationPanel/InformationPanel';
import { TeamPanel } from './teamPanel/TeamPanel';

const scrollToRef = (ref: any) =>{ 
  ref.current.scrollIntoView({behavior: 'smooth'})
  //  window.scrollTo(0, ref.current.offsetTop)
}   

export const LandingPage = () => {

  const discover = useSelector((state: any) => state.user.discover)
  const myRef = useRef(null)

  useEffect(()=>{
    if (discover)
      scrollToRef(myRef)
    }, [discover])


  return (
    <>
      <WelcomeSection position={discover ? 'relative' : 'absolute'} />
      { discover && 
      <Column width='100%' horizontal='center'>
        <div ref={myRef}/>
        <InformationPanel />
        <TeamPanel />
      </Column>}
    </>
  );
}
