import { useState, useMemo, useEffect } from 'react';
import { VisibilityType, WordListType } from '../../../common/types';


function getErrorFromField(
    key: string,
    value: string | string[] | [] | number | boolean | VisibilityType
  ) {
  switch (key) {
    case 'subject':
      return !(value !== '');
    case 'rank':
      return !(value || value === 0);
    case 'level': 
      return !(value || value === 0);
    case 'comments': 
      return false;
    case 'validated':
      return false;
    default: 
      return !value
  }
}

export function useWordListFormFields(wordList?: WordListType)
{
  console.log('name changed')
  // const [fields, setFields] = useState({...wordlist });
  // const [errors, setErrors] = useState({
  //   name: !wordlist.name,
  //   subject: !wordlist.subject,
  //   level: !(wordlist.level || wordlist.level === 0),
  //   rank: !(wordlist.rank || wordlist.rank === 0),
  //   visibility: !wordlist.visibility 
  // });
  // const [canSave, setCanSave] = useState(false);
  // const [checkError, setCheckError] = useState(false);

  // useEffect(()=> {
  //   console.log('--------------------------------------')
  //   console.log(wordlist)
  //   setFields({...wordlist})
  // }, [wordlist]);
  
  // useMemo(()=> {
  //   const findError = Object.keys(errors).find((error) => errors[error as 'name' | 'subject' | 'level' | 'rank' | 'visibility'])
  //   setCanSave(!findError);
  // }, [errors])

  const [fields, setFields] = useState({ 
    name: wordList?.name || '',
    subject: wordList?.subject || [],
    level: wordList?.level || 0,
    rank: wordList?.rank || 0,
    validated: wordList?.validated || false,
    visibility: wordList?.visibility || "owner" as VisibilityType,
    comments: wordList?.comments || ''
   });
  const [errors, setErrors] = useState({
    name: !wordList?.name,
    subject: !wordList?.subject,
    level: !(wordList?.level || wordList?.level === 0),
    rank: !(wordList?.rank || wordList?.rank === 0),
    visibility: !wordList?.visibility 
  });
  const [canSave, setCanSave] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(()=> {
    console.log('--------------------------------------')
    console.log(wordList)
    setFields({ 
      name: wordList?.name || '',
      subject: wordList?.subject || [],
      level: wordList?.level || 0,
      rank: wordList?.rank || 0,
      validated: wordList?.validated || true,
      visibility: wordList?.visibility || "owner" as VisibilityType,
      comments: wordList?.comments || ''
     })
  }, [wordList]);
  
  useMemo(()=> {
    const findError = Object.keys(errors).find((error) => errors[error as 'name' | 'subject' | 'level' | 'rank' | 'visibility'])
    setCanSave(!findError);
  }, [errors])

  return {
    fields,
    errors,
    canSave,
    checkError,
    setCheckError,
    setFields
  }
}
