import { useState, useEffect, useMemo } from 'react';
import { VisibilityType } from '../../../common/types';


function getErrorFromField(key: string, value: string | string[] | [] | number | boolean | VisibilityType){
  switch (key) {
    case 'subject':
      return !(value != '');
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

export function useWordFormFields(
  {name, subject, level, rank, validated, visibility, comments} 
  : {name: string, subject: string[], level: number, rank: number, validated?: boolean, visibility: VisibilityType, comments: string}
  )
{
  const [fields, setFields] = useState({name, subject, level, rank, validated, visibility, comments});
  const [errors, setErrors] = useState({name: !name, subject: !subject, level: !(level || level === 0), rank: !(rank || rank === 0), visibility: !visibility } )
  const [canSave, setCanSave] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(()=>{
    setFields({name, subject, level, rank, validated, visibility, comments})
    setErrors({
      name: getErrorFromField('name', name), 
      subject: getErrorFromField('subject', subject), 
      level: getErrorFromField('level', level),
      rank: getErrorFromField('rank', rank), 
      visibility: getErrorFromField('visibility', visibility) 
    })
  }, [name])

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
    setFields: (
      key: 'name' | 'subject' | 'level' | 'rank' | 'validated' | 'visibility' | 'comments', 
      value: string | string[] | number | boolean | VisibilityType
    ) => {
      setFields({...fields, [key]: value});
      setErrors({...errors, [key]:  getErrorFromField(key, value)});
    },
  }
}