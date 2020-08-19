import React from 'react'
import {IconTemp} from './IconTemp.jsx'
import DefaultIcon from '../../assets/icons/default-icon.svg'
import Logout from './icons/Logout.svg';

const Icon = [
  { Logout },
].reduce((acc,icon)=>{
  const [e] =Object.entries(icon);
  debugger
return { ...acc, [e[0]]: (props) => <IconTemp {...props} src={e[1]} /> };
},{});
//
console.log(Icon);
console.log(Icon.Logout);
export default Icon;
