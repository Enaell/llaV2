import React, { useRef, useEffect, MutableRefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Column } from '../common/Flexbox';

import WelcomeSection from './welcomeSection';
import { InformationPanel } from './informationPanel/InformationPanel';
import { TeamPanel } from './teamPanel/TeamPanel';
import { ContactPanel } from './contactPanel/ContactPanel';

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

function scrollToSection(
  refs: React.MutableRefObject<{[key: string]: HTMLDivElement | null;}>
, section: string
) {
  refs.current[section]?.scrollIntoView({behavior: 'smooth'})
}

function scrollToTop(ref: MutableRefObject<HTMLDivElement>) {
    ref.current.scrollIntoView({behavior: 'smooth'});
}

export const LandingPage = () => {

  const { discover, sections, section = sections[0] } = useSelector((state: any) => state.landing) as {discover: number, sections: string[], section: string}

  const topRef = useRef(null as unknown) as MutableRefObject<HTMLDivElement>;
  const refs = useRef({} as {[key: string]: HTMLDivElement | null });

  useEffect(()=> {
    if (discover) {
      console.log('===================================');
      console.log(section);
      console.log(sections);
      console.log(sections.includes(section));
      console.log('------------------------------------')
      sections.includes(section) ?  scrollToSection(refs, section) : scrollToTop(topRef);
    }
  }, [discover, sections, section, topRef]);

  return (
    <>
      <div ref={topRef}/>
      <WelcomeSection position={discover ? 'relative' : 'absolute'} />
      { discover && 
      <>
        { sections.map((section) => (
        <Column width='100%' horizontal='center'>
          <div ref= {element => (refs.current[section] = element)}/>
          <Section sectionName={section}/>
        </Column>
        ))}
      </>}
    </>
  );
}
