import { useState, useMemo } from 'react';
import { VisibilityType } from '../../../common/types';


function getErrorFromField(key: string, value: string | string[] | [] | number | boolean | VisibilityType){
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

export function useWordListFormFields(
  {name, subject, level, rank, validated, visibility, comments} 
  : {name: string, subject: string[], level: number, rank: number, validated?: boolean, visibility: VisibilityType, comments: string}
  )
{
  console.log('name changed')
  const [fields, setFields] = useState({name, subject, level, rank, validated, visibility, comments});
  const [errors, setErrors] = useState({name: !name, subject: !subject, level: !(level || level === 0), rank: !(rank || rank === 0), visibility: !visibility } )
  const [canSave, setCanSave] = useState(false);
  const [checkError, setCheckError] = useState(false);

  // useEffect(()=>{
  //   setFields({ ...fields, name})
  //   setErrors({
  //     ...errors,
  //     name: getErrorFromField('name', name),
  //   })
  // }, [name])

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
