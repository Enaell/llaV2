import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Column, Row } from '../common/Flexbox';

import WelcomeSection from './welcomeSection';
import { InformationPanel } from './informationPanel/InformationPanel';
import { TeamPanel } from './teamPanel/TeamPanel';
import { ContactPanel } from './contactPanel/ContactPanel';

const scrollToRef = (ref: any) =>{ 
  ref.current.scrollIntoView({behavior: 'smooth'})
  //  window.scrollTo(0, ref.current.offsetTop)
}

const Section = ({sectionName}: {sectionName: string}) => {
  switch (sectionName) {
    case 'information':
      return <InformationPanel />
    case 'stat':
      return <div />
    case 'team':
      return <TeamPanel />
    case 'contact':
      return <ContactPanel />
    default:
      return <div />
  }
}

const truc = (refs: React.MutableRefObject<{
  [key: number]: HTMLDivElement | null;
}>
, index: number) => {
  refs.current[index]?.scrollIntoView({behavior: 'smooth'})
}

export const LandingPage = () => {

  const { discover, sections } = useSelector((state: any) => state.landing) as {discover: number, sections: string[]}

  const refs = useRef({} as {[key: number]: HTMLDivElement | null });
  


  useEffect(()=>{
    if (discover)
      truc( refs, sections.indexOf('information'))
      // scrollToRef(myRef)
    }, [discover, sections])


  return (
    <>
      <WelcomeSection position={discover ? 'relative' : 'absolute'} />
      { discover && 
      <>
        { sections.map((section, idx) => (
        <Column width='100%' horizontal='center'>
          <div ref= {element => (refs.current[idx] = element)}/>
          <Section sectionName={section}/>
        </Column>
        ))}
      </>}
    </>
  );
}
